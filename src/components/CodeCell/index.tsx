import React, { MouseEvent, useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import esBundle from "../../bunder";

export const CodeCell: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [prevInput, setPrevInput] = useState<undefined | string>(undefined);

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    if (input && input !== prevInput) {
      setPrevInput(input);
      const bundledCode = await esBundle(input);
      setCode(bundledCode);
    } else {
      console.log("empty or same as before ");
    }
  };

  return (
    <div className="code-cell">
      <CodeEditor initialValue="" setInput={setInput} />
      <div>
        <button
          className="button button-format is-primary is-medium"
          onClick={handleSubmit}
          style={{ display: "block" }}
        >
          submit
        </button>
      </div>
      <Preview code={code} />
    </div>
  );
};
