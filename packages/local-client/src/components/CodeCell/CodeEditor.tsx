import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import classes from "./CodeEditor.module.css";
import { Cell, CellLanguages } from "../../redux";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  handleSubmit: () => void;
  language: CellLanguages;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  handleSubmit,
  language,
}) => {
  const editorRef = useRef<any>();

  const onMount: OnMount = (monacoEditor, monaco) => {
    editorRef.current = monacoEditor;
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      // noSemanticValidation: true,
      noSyntaxValidation: true,
    });
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
    onChange("");
    editorRef.current.setValue("");
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.buttons}>
        <button
          className="button button-format is-primary is-small clear-button"
          onClick={onClearClick}
        >
          Clear
        </button>
        <div className={classes["format-run"]}>
          <button
            className="button button-format is-primary is-small format-button"
            onClick={onFormatClick}
          >
            Format
          </button>
          <button
            className="button button-format is-primary is-small"
            onClick={handleSubmit}
          >
            Run
          </button>
        </div>
      </div>
      <Editor
        onChange={(e) => onChange(e || "")}
        onMount={onMount}
        value={initialValue}
        height="100%"
        language={language}
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          fontSize: 20,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

CodeEditor.defaultProps = {
  initialValue: "",
};

export default CodeEditor;
