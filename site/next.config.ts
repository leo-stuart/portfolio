import type { NextConfig } from "next";
import { execSync } from "node:child_process";

function git(cmd: string): string {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

const sha =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || git("git rev-parse --short HEAD") || "dev";
const buildDate = new Date().toISOString().slice(0, 10);

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_SHA: sha,
    NEXT_PUBLIC_BUILD_DATE: buildDate,
  },
};

export default nextConfig;
