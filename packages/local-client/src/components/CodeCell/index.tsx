import React, { useState, useEffect, KeyboardEvent } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "../Resizable";
import { Cell, createBundle } from "../../redux";
import {
  useActions,
  useCumulativeCode,
  useDispatch,
  useSelector,
} from "../../hooks";

interface KeysPressed {
  [index: string]: boolean;
}

interface CodeCellProps {
  cell: Cell;
  hasTypescript: boolean;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell, hasTypescript }) => {
  // const [prevContent, setPrevContent] = useState<undefined | string>(undefined);
  const { updateCellContent } = useActions();
  const dispatch = useDispatch();
  const cumulativeCode = useCumulativeCode(cell.id);

  let keysPressed: KeysPressed = {};
  const handleSubmit = () => {
    // if (cell.content && cell.content !== prevContent) {
    //   setPrevContent(cell.content);
    //   dispatch(
    //     createBundle({ id: cell.id, input: cumulativeCode, hasTypescript })
    //   );
    // } else {
    //   console.log("the code cell may be empty or same as before");
    // }
    dispatch(
      createBundle({ id: cell.id, input: cumulativeCode, hasTypescript })
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    keysPressed[event.key] = true;
    if (keysPressed["Control"] && keysPressed["Shift"]) {
      handleSubmit();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    delete keysPressed[event.key];
  };

  // remove auto-execution for now
  // useEffect(() => {
  //   const timer = setTimeout(handleSubmit, 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [cell.content]);

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
              onChange={(value) =>
                updateCellContent({ id: cell.id, content: value })
              }
              handleSubmit={handleSubmit}
              language={cell.language || "javascript"}
            />
          </Resizable>
          <Preview id={cell.id} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
