import { spawn } from "node:child_process";
import { rm, rename } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src/app/api");
const stashDir = path.join(root, ".api-stash");

// A static export cannot include POST /api/consultation. The Worker serves that route.
await rm(path.join(root, ".next"), { recursive: true, force: true });
await rename(apiDir, stashDir);

try {
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build"], {
      stdio: "inherit",
      env: { ...process.env, STATIC_EXPORT: "1" },
    });
    child.on("error", reject);
    child.on("exit", resolve);
  });

  if (code !== 0) {
    throw new Error(`next build exited with ${code}`);
  }
} finally {
  await rename(stashDir, apiDir);
}
