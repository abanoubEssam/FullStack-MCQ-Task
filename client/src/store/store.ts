import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk'
import { userReducer } from './userReducer';


const middleware = [thunk]

export const store = createStore(
    userReducer,
    compose(
        applyMiddleware(...middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose
    )
);
