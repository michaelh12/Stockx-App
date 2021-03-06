import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import portfolio from './portfolio';

const reducer = combineReducers({ portfolio });
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
// );

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;
export * from './portfolio';
