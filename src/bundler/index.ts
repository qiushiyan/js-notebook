import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let hasService = false;

const esBundle = async (input: string): Promise<string> => {
  if (!hasService) {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.11.0/esbuild.wasm",
    });
    hasService = true;
  }
  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(input)],
    define: {
      global: "window",
    },
  });
  return result.outputFiles[0].text;
};

export default esBundle;
