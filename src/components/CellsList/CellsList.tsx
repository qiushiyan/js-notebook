import React from "react";
import CellItem from "./CellItem";
import { useSelector, useDispatch } from "../../hooks";

const CellsList: React.FC = () => {
  const { data, order } = useSelector((state) => state.cells);
  const cellsData = order.map((id) => data[id]);
  const cells = cellsData.map((cell) => {
    return <CellItem key={cell.id} cell={cell} />;
  });

  return <div>{cells}</div>;
};

export default CellsList;
