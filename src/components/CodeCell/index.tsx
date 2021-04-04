import React, { useState, useEffect, KeyboardEvent } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import esBundle from "../../bundler";
import Resizable from "../Resizable";
import { Cell } from "../../redux";
import { useActions } from "../../hooks";

interface KeysPressed {
  [index: string]: boolean;
}

export interface Output {
  code: string;
  error: string;
}

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [output, setOutput] = useState<Output>({ code: "", error: "" });
  const [prevContent, setPrevContent] = useState<undefined | string>(undefined);
  const { updateCell } = useActions();

  let keysPressed: KeysPressed = {};

  const handleSubmit = async () => {
    if (cell.content && cell.content !== prevContent) {
      setPrevContent(cell.content);
      const bundledResult = await esBundle(cell.content);
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
  }, [cell.content]);

  return (
    <div className="code-cell">
      <Resizable direction="vertical">
        <div
          style={{ height: "100%", display: "flex", flexDirection: "row" }}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        >
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue={cell.content}
              onChange={(value) => updateCell({ id: cell.id, content: value })}
              handleSubmit={handleSubmit}
            />
          </Resizable>
          <Preview output={output} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
