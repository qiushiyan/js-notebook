import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [text, setText] = useState<string>("# hello");
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
        <MDEditor.Markdown className="card-content" source={text} />
      )}
      {editMode && <MDEditor value={text} onChange={(e) => setText(e || "")} />}
    </div>
  );
};

export default TextEditor;
