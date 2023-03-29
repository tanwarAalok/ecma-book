import { useActions } from '../hooks/use-actions';
import './add-cell.css';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellafter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-btn">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellafter(prevCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellafter(prevCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;