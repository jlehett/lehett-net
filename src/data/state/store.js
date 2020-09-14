import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import {
    connectRouter,
    routerMiddleware,
} from 'connected-react-router';
import createRootReducer from './reducer';

export const history = require('history').createBrowserHistory();

const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
);

const store = createStore(
    createRootReducer(history),
    enhancer,
);

export default store;
