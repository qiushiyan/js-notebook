import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell } from "../../redux";
import { useActions } from "../../hooks";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { updateCellContent } = useActions();
  const [editMode, setEditMode] = useState<boolean>(false);
  const mdEditor = useRef<any>();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        mdEditor.current &&
        event.target &&
        mdEditor.current.contains(event.target)
      ) {
        setEditMode(true);
      } else {
        setEditMode(false);
      }
    };
    document.addEventListener("click", listener, { capture: true });
    return () =>
      document.removeEventListener("click", listener, { capture: true });
  }, []);

  return (
    <div ref={mdEditor} className="text-editor card">
      {!editMode && (
        <MDEditor.Markdown className="card-content" source={cell.content} />
      )}
      {editMode && (
        <MDEditor
          value={cell.content}
          onChange={(e) => updateCellContent({ id: cell.id, content: e || "" })}
        />
      )}
    </div>
  );
};

export default TextEditor;
