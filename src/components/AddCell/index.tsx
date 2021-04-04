import React from "react";
import classes from "./AddCell.module.css";
import { useActions } from "../../hooks";

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCell } = useActions();
  return (
    <div className={classes["add-cell"]}>
      <div className={classes["add-buttons"]}>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCell({ id: nextCellId, type: "code" })}
        >
          <span className="material-icons">add</span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCell({ id: nextCellId, type: "text" })}
        >
          <span className="material-icons">add</span>
          <span>Text</span>
        </button>
      </div>
      <div className={classes["divider"]}></div>
    </div>
  );
};

export default AddCell;
