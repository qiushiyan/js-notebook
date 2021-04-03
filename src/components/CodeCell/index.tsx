import React, { useState, useEffect, KeyboardEvent } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import esBundle from "../../bundler";
import Resizable from "../Resizable/Resizable";

interface KeysPressed {
  [index: string]: boolean;
}

export interface Output {
  code: string;
  error: string;
}

export const CodeCell: React.FC = () => {
  const [input, setInput] = useState<string | undefined>("");
  const [output, setOutput] = useState<Output>({ code: "", error: "" });
  const [prevInput, setPrevInput] = useState<undefined | string>(undefined);

  let keysPressed: KeysPressed = {};

  const handleSubmit = async () => {
    if (input && input !== prevInput) {
      setPrevInput(input);
      const bundledResult = await esBundle(input);
      setOutput(bundledResult);
    } else {
      console.log("empty or same as before ");
    }
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    keysPressed[event.key] = true;
    if (keysPressed["Control"] && keysPressed["Shift"]) {
      await handleSubmit();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    delete keysPressed[event.key];
  };

  useEffect(() => {
    const timer = setTimeout(handleSubmit, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div
        className="code-cell"
        style={{ height: "100%", display: "flex", flexDirection: "row" }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue=""
            setInput={setInput}
            handleSubmit={handleSubmit}
          />
        </Resizable>
        <Preview output={output} />
      </div>
    </Resizable>
  );
};
