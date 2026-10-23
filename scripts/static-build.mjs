import { spawn } from "node:child_process";
import { access, rename, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const nextBin = path.join(root, "node_modules/next/dist/bin/next");

function runNextBuild(extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, "build"], {
      stdio: "inherit",
      env: { ...process.env, ...extraEnv },
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`next build exited with ${code}`));
      }
    });
  });
}

// Vercel hosts the consultation route as a function. Static export is for Cloudflare.
if (process.env.VERCEL) {
  await runNextBuild();
} else {
  const apiDir = path.join(root, "src/app/api");
  const stashDir = path.join(root, ".api-stash");
  let stashed = false;

  await rm(path.join(root, ".next"), { recursive: true, force: true });

  try {
    await access(apiDir);
    await rename(apiDir, stashDir);
    stashed = true;
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    await runNextBuild({ STATIC_EXPORT: "1" });
  } finally {
    if (stashed) {
      await rename(stashDir, apiDir);
    }
  }
}
