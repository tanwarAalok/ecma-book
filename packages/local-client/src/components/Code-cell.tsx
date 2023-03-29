import { useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { Cell } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import "./code-cell.css";
import { useComulativeCode } from "../hooks/use-comulative-code";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const comulativeCode = useComulativeCode(cell.id);


  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, comulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, comulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress max="100" className="progress is-small is-primary">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
