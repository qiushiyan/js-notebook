import React, { useRef } from "react";
import manaco from "monaco-editor";
import Editor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import classes from "./CodeEditor.module.css";

interface CodeEditorProps {
  initialValue: string;
  setInput: (input: string | undefined) => void;
  handleSubmit: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  setInput,
  handleSubmit,
}) => {
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
          className="button button-format is-primary is-medium clear-button"
          onClick={onClearClick}
        >
          Clear
        </button>
        <div className={classes["format-run"]}>
          <button
            className="button button-format is-primary is-medium format-button"
            onClick={onFormatClick}
          >
            Format
          </button>
          <button
            className="button button-format is-primary is-medium"
            onClick={handleSubmit}
          >
            Run
          </button>
        </div>
      </div>
      <Editor
        onChange={(e) => setInput(e)}
        onMount={onMount}
        value={initialValue}
        height="100%"
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
