import React from "react";
import { Cell } from "../../redux";
import TextEditor from "./TextEditor";

interface TextCellProps {
  cell: Cell;
}

const TextCell: React.FC<TextCellProps> = ({ cell }) => {
  return (
    <div className="text-cell">
      <TextEditor cell={cell} />
    </div>
  );
};

export default TextCell;
