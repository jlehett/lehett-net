import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import mosaic from './mosaic/mosaic.reducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    mosaic
});

export default createRootReducer;