import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddlware } from './middleware/persist-middleware';


export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddlware, thunk)
);
