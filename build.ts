import { build } from "esbuild";

await build({
  entryPoints: ["src/index.tsx"],
  tsconfig: "./tsconfig.json",
  outdir: "lib",
});
