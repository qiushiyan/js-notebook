import React from "react";
import CellItem from "./CellItem";
import { useSelector } from "../../hooks";
import AddCell from "../AddCell";

const CellsList: React.FC = () => {
  const { data, order } = useSelector((state) => state.cells);
  const cellsData = order.map((id) => data[id]);
  const cells = cellsData.map((cell) => {
    return (
      <div className="cells-list-item" key={cell.id}>
        <CellItem cell={cell} />
        <AddCell prevCellId={cell.id} />
      </div>
    );
  });

  return (
    <div className="cells-list">
      {order.length === 0 && (
        <div className="visible">
          <AddCell prevCellId={null} />
        </div>
      )}
      {cells}
    </div>
  );
};

export default CellsList;
