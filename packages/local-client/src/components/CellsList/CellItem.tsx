import React from "react";
import { Cell } from "../../redux";
import TextCell from "../TextCell";
import CodeCell from "../CodeCell";
import ActionBar from "../ActionBar";
import LanguageDropdown from "../LanguageDropdown";

interface CellItemProps {
  cell: Cell;
  hasTypescript: boolean;
}

const CellItem: React.FC<CellItemProps> = ({ cell, hasTypescript }) => {
  return (
    <>
      {cell.type === "code" && (
        <div className="cell-list-item">
          <div className="code-cell">
            <div className="action-bar-wrapper">
              <LanguageDropdown
                id={cell.id}
                initialLanguage={cell.language || "javascript"}
              />
              <ActionBar id={cell.id} />
            </div>
            <CodeCell cell={cell} hasTypescript={hasTypescript} />
          </div>
        </div>
      )}
      {cell.type === "text" && (
        <div className="cell-list-item">
          <div className="text-cell">
            <TextCell cell={cell} />
            <ActionBar id={cell.id} />
          </div>
        </div>
      )}
    </>
  );
};
export default React.memo(CellItem);
