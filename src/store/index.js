import { thunk } from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import { pictureReducer } from './reducers/picture.reducer';
import { userReducer } from './reducers/user.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    pictureModule: pictureReducer,
    userModule: userReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

window.gStore = store;
