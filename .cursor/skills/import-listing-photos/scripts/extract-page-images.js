// Paste this function into the listing page with the browser Runtime.evaluate tool.
// It returns full-size photo URLs and leaves logos, maps, and floor plans out.
export function extractListingImageUrls() {
  const urls = new Set();
  const junk =
    /logo|sprite|icon|avatar|favicon|badge|placeholder|spinner|pixel|tracking|analytics|mapbox|staticmap|floor[-_]?plan/i;

  const add = (value) => {
    if (!value || typeof value !== "string") return;
    const cleaned = value
      .replace(/\\u0026/gi, "&")
      .replace(/\\u002F/gi, "/")
      .replace(/\\\//g, "/")
      .replace(/&amp;/g, "&")
      .trim()
      .split(/\s+/)[0];
    if (!/^https?:\/\//i.test(cleaned)) return;
    if (junk.test(cleaned)) return;
    if (/\.(svg|gif)(\?|$)/i.test(cleaned)) return;
    urls.add(cleaned);
  };

  const largest = (srcset) => {
    let best = "";
    let width = -1;
    for (const part of srcset.split(",")) {
      const [url, size] = part.trim().split(/\s+/);
      const parsed = parseInt(size, 10) || 0;
      if (parsed >= width) {
        width = parsed;
        best = url;
      }
    }
    return best;
  };

  for (const img of document.querySelectorAll("img")) {
    add(img.currentSrc || img.src);
    if (img.srcset) add(largest(img.srcset));
  }
  for (const source of document.querySelectorAll("source[srcset]")) {
    add(largest(source.srcset));
  }

  const html = document.documentElement.innerHTML
    .replace(/\\u0026/gi, "&")
    .replace(/\\u002F/gi, "/")
    .replace(/\\\//g, "/");
  for (const match of html.match(/https?:\/\/[^"'\\\s>]+\.(?:jpe?g|png|webp|avif)(?:\?[^"'\\\s>]*)?/gi) || []) {
    add(match);
  }

  return [...urls];
}
