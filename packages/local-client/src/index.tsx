import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './state';

const App = () => {
    return (
      <Provider store={store}>
        <div>
          <CellList/>
        </div>
      </Provider>
    );
};


const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

