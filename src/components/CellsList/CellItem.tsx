import React from "react";
import { Cell } from "../../redux";
import TextCell from "../TextCell";
import CodeCell from "../CodeCell";

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  return (
    <div>
      {cell.type === "code" && <CodeCell />}
      {cell.type === "text" && <TextCell />}
    </div>
  );
};
export default CellItem;
