import React, { FormEvent, useEffect, useState, useRef } from "react";
// import dotenv from "dotenv";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

// dotenv.config();

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [prevInput, setPrevInput] = useState<undefined | string>(undefined);
  const [esbuildInitialized, setEsbuildInitialized] = useState<boolean>(false);
  const iframe = useRef<any>();

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.11.0/esbuild.wasm",
    });
    setEsbuildInitialized(true);
  };

  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (input && input !== prevInput) {
      // update prevInput
      setPrevInput(input);
      // reset dom
      iframe.current.srcdoc = html;
      if (!esbuildInitialized) {
        return;
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
      // setCode(result.outputFiles[0].text);
      iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
    } else {
      console.log("I don't want to run your code");
    }
  };

  const html = `
    <html>
      <head>
        <body>
          <div id = "root"></div>
          <script>
            const process = {env: {NODE_ENV: "production"}}
          </script>
          <script>
            window.addEventListener("message", (event) => {
              try {
                eval(event.data)
              } catch(err) {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                console.error(err);
              }
            }, false)
          </script>
        </body>
      </head>
    </html>
  `;

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
      <p>current input {input}</p>
      <p>previous input {prevInput}</p>
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html}></iframe>
    </div>
  );
};

export default App;
