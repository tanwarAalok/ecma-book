import { Fragment, useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import "./cell-list.css";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => {
      return order.map((id) => {
        return data[id];
      });
    });
  
  const { fetchCells } = useActions();
  
  useEffect(() => {
    fetchCells();
  }, [])

    const renderedCells = cells.map((cell) => (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell prevCellId={cell.id} />
      </Fragment>
    ));

    return (
      <div className="cell-list">
        <AddCell forceVisible={cells.length === 0} prevCellId={null} />
        {renderedCells}
      </div>
    );
};

export default CellList;