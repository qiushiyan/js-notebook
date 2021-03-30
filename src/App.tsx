import React, { FormEvent, useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetchPlugin";

function App() {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const ref = useRef<any>();

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.11.0/esbuild.wasm",
    });
    ref.current = true;
  };

  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ref.current) {
      return;
    }
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: { global: "window" },
    });
    setCode(result.outputFiles[0].text);
  };

  return (
    <div className="App">
      welcome to js-notebook
      <form onSubmit={handleSubmit}>
        <textarea
          cols={60}
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button style={{ display: "block" }}>submit</button>
      </form>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
