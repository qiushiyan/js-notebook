import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import classes from "./CodeEditor.module.css";

interface CodeEditorProps {
  initialValue: string;
  setInput: (input: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, setInput }) => {
  const editorRef = useRef<any>();

  const onMount: OnMount = (monacoEditor, monaco) => {
    editorRef.current = monacoEditor;
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: false,
    });
    editorRef.current.setValue(formatted);
  };

  const onClearClick = () => {
    setInput("");
    editorRef.current.setValue("");
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.buttons}>
        <button
          className="button button-format is-primary is-medium"
          onClick={onFormatClick}
        >
          Format
        </button>
        <button
          className="button button-format is-primary is-medium"
          onClick={onClearClick}
        >
          Clear
        </button>
      </div>
      <Editor
        onChange={(e) => setInput(e as string)}
        onMount={onMount}
        value={initialValue}
        height="500px"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          fontSize: 20,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

CodeEditor.defaultProps = {
  initialValue: "",
};

export default CodeEditor;
