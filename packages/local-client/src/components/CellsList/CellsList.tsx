import React, { useEffect } from "react";
import CellItem from "./CellItem";
import { useDispatch, useSelector } from "../../hooks";
import { Cell, fetchCells, saveCells } from "../../redux";
import AddCell from "../AddCell";

const CellsList: React.FC = () => {
  const dispatch = useDispatch();

  // fetch cells from file
  useEffect(() => {
    dispatch(fetchCells());
  }, []);

  // save cells to file every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(saveCells());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const { cellsData, order } = useSelector(({ cells }) => {
    let { data, order } = cells;
    const cellsData = order.map((id) => data[id]);
    return { cellsData, order };
  });

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
