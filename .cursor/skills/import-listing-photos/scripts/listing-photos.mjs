import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const token = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const rooms = new Set(["bedroom", "kitchen", "livingroom", "diningroom", "outdoor", "details"]);

const junk =
  /logo|sprite|icon|avatar|favicon|badge|placeholder|spinner|pixel|tracking|analytics|mapbox|staticmap|google\.com\/maps|floor[-_]?plan/i;

function usage() {
  console.error(`Usage:
  node .cursor/skills/import-listing-photos/scripts/listing-photos.mjs plan --urls <file>
  node .cursor/skills/import-listing-photos/scripts/listing-photos.mjs download --dir images/.incoming/<slug> --urls <file> [--referer <listing-url>]
  node .cursor/skills/import-listing-photos/scripts/listing-photos.mjs finalize --from images/.incoming/<slug> --to images/<slug> --keep <keep.json>`);
  process.exit(1);
}

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) return "";
  return process.argv[index + 1];
}

function resolveUnder(parent, target) {
  const base = path.resolve(root, parent);
  const abs = path.resolve(root, target);
  if (abs !== base && !abs.startsWith(base + path.sep)) {
    throw new Error(`${target} must stay inside ${parent}`);
  }
  return abs;
}

export function unescapeUrl(value) {
  return value
    .replace(/\\u0026/gi, "&")
    .replace(/\\u002F/gi, "/")
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&")
    .trim();
}

function isImageUrl(value) {
  if (!/^https?:\/\//i.test(value)) return false;
  if (junk.test(value)) return false;
  if (/\.(svg|gif)(\?|$)/i.test(value)) return false;
  const small = value.match(/[?&](?:w|width|h|height)=(\d+)/i);
  if (small && Number(small[1]) > 0 && Number(small[1]) < 640) return false;
  return true;
}

export function sizeScore(url) {
  const found = [];
  const sized = url.match(/cc_ft_(\d+)/i);
  if (sized) found.push(Number(sized[1]));
  const box = url.match(/[_-](\d{3,4})x(\d{3,4})/i);
  if (box) found.push(Number(box[1]), Number(box[2]));
  for (const match of url.matchAll(/[?&](?:w|width|h|height)=(\d+)/gi)) {
    found.push(Number(match[1]));
  }
  return found.reduce((max, n) => (n > max ? n : max), 0);
}

export function canonical(urlString) {
  let url;
  try {
    url = new URL(urlString);
  } catch {
    return "";
  }
  let pathname = decodeURIComponent(url.pathname);
  pathname = pathname.replace(/-cc_ft_\d+/gi, "");
  pathname = pathname.replace(/-p_[a-z]\b/gi, "");
  pathname = pathname.replace(/\/(?:genMid|genDesktop|medium|small|bigphoto)\//gi, "/");
  pathname = pathname.replace(/[_-](?:thumb|small|medium|large|xl|xxl|full|orig|original)\b/gi, "");
  pathname = pathname.replace(/[_-]\d{2,4}x\d{2,4}/g, "");
  pathname = pathname.replace(/\.(?:jpe?g|png|webp|avif)$/i, "");
  return `${url.hostname}${pathname}`;
}

export function selectUrls(rawUrls) {
  const best = new Map();
  for (const raw of rawUrls) {
    const url = unescapeUrl(String(raw));
    if (!isImageUrl(url)) continue;
    const key = canonical(url);
    if (!key) continue;
    const current = best.get(key);
    if (!current || sizeScore(url) > sizeScore(current)) best.set(key, url);
  }
  return [...best.values()].slice(0, 120);
}

async function readUrlList(file) {
  const text = await readFile(path.resolve(root, file), "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

async function dimensions(file) {
  const { stdout } = await execFileAsync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file]);
  const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1] || 0);
  const height = Number(stdout.match(/pixelHeight:\s*(\d+)/)?.[1] || 0);
  return { width, height };
}

function extensionFor(contentType, url) {
  const type = contentType.split(";")[0].trim().toLowerCase();
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/avif") return "avif";
  const fromUrl = new URL(url).pathname.match(/\.(jpe?g|png|webp|avif)$/i);
  if (!fromUrl) return "";
  return fromUrl[1].toLowerCase() === "jpeg" ? "jpg" : fromUrl[1].toLowerCase();
}

async function toJpeg(source, dest) {
  await execFileAsync("sips", ["-s", "format", "jpeg", source, "--out", dest]);
}

async function downloadOne(url, dir, index, referer) {
  const headers = {
    Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  };
  if (referer) headers.Referer = referer;
  const response = await fetch(url, { headers, redirect: "follow", signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const ext = extensionFor(response.headers.get("content-type") || "", url);
  if (!ext) throw new Error(`not an image ${url}`);
  const base = String(index + 1).padStart(3, "0");
  const saved = path.join(dir, `${base}.${ext}`);
  await writeFile(saved, bytes);
  let view = saved;
  if (ext === "avif") {
    view = path.join(dir, `${base}.jpg`);
    await toJpeg(saved, view);
    await rm(saved);
  }
  const size = await dimensions(view);
  const longEdge = Math.max(size.width, size.height);
  if (longEdge < 640 || Math.min(size.width, size.height) < 300) {
    await rm(view);
    return { status: "small", url };
  }
  const hash = createHash("sha256").update(await readFile(view)).digest("hex");
  return { status: "ok", url, file: path.basename(view), ...size, hash };
}

async function download(dirArg, urlsFile, referer) {
  const dir = resolveUnder("images/.incoming", dirArg);
  const urls = selectUrls(await readUrlList(urlsFile));
  await mkdir(dir, { recursive: true });
  const kept = [];
  const seen = new Set();
  let small = 0;
  let duplicate = 0;
  let failed = 0;
  const queue = urls.map((url, index) => ({ url, index }));
  let cursor = 0;
  async function worker() {
    while (cursor < queue.length) {
      const item = queue[cursor++];
      try {
        const result = await downloadOne(item.url, dir, item.index, referer);
        if (result.status === "small") small += 1;
        else if (seen.has(result.hash)) {
          duplicate += 1;
          await rm(path.join(dir, result.file));
        } else {
          seen.add(result.hash);
          kept.push(result);
        }
      } catch (error) {
        failed += 1;
        console.error(error instanceof Error ? error.message : String(error));
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(4, queue.length) }, () => worker()));
  kept.sort((a, b) => a.file.localeCompare(b.file));
  console.log(
    JSON.stringify(
      { dir: path.relative(root, dir), downloaded: kept, skippedSmall: small, skippedDuplicate: duplicate, failed },
      null,
      2,
    ),
  );
}

async function finalize(fromArg, toArg, keepFile) {
  const from = resolveUnder("images/.incoming", fromArg);
  const to = resolveUnder("images", toArg);
  if (to.startsWith(path.resolve(root, "images/.incoming"))) {
    throw new Error("destination must be images/<street>, not the incoming folder");
  }
  const existing = await readdir(to).catch(() => null);
  if (existing && existing.length > 0) {
    throw new Error(`${toArg} already has files. Leave it and ask before replacing anything.`);
  }
  const keep = JSON.parse(await readFile(path.resolve(root, keepFile), "utf8"));
  if (!Array.isArray(keep)) throw new Error("keep.json must be a list");
  const street = path.basename(to);
  if (!token.test(street)) throw new Error(`street folder "${street}" must be lowercase kebab case`);
  const written = [];
  const used = new Set();
  if (keep.length === 0) {
    await rm(from, { recursive: true, force: true });
    console.log(JSON.stringify({ dir: path.relative(root, to), files: [] }, null, 2));
    return;
  }
  await mkdir(to, { recursive: true });
  for (const item of keep) {
    if (!rooms.has(item.room)) {
      throw new Error(`room "${item.room}" must be bedroom, kitchen, livingroom, diningroom, outdoor, or details`);
    }
    if (!token.test(item.specific || "")) {
      throw new Error(`specific "${item.specific}" must be a word or number, like kids, laundry, or 01`);
    }
    const source = path.resolve(from, item.file);
    if (!source.startsWith(from + path.sep)) throw new Error(`refusing ${item.file}`);
    const name = `${item.room}-${item.specific}-${street}.jpg`;
    if (used.has(name)) throw new Error(`duplicate name ${name}`);
    used.add(name);
    const dest = path.join(to, name);
    await toJpeg(source, dest);
    const size = await dimensions(dest);
    written.push({ file: name, room: item.room, specific: item.specific, ...size });
  }
  await rm(from, { recursive: true, force: true });
  console.log(JSON.stringify({ dir: path.relative(root, to), files: written }, null, 2));
}

async function main() {
  const command = process.argv[2];
  if (command === "plan") {
    console.log(JSON.stringify(selectUrls(await readUrlList(arg("--urls"))), null, 2));
    return;
  }
  if (command === "download") {
    await download(arg("--dir"), arg("--urls"), arg("--referer"));
    return;
  }
  if (command === "finalize") {
    await finalize(arg("--from"), arg("--to"), arg("--keep"));
    return;
  }
  usage();
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
