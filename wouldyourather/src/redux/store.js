import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {userReducer, userStatusReducer} from './reducers/rdUsers';
import ReduxThunk from 'redux-thunk';
// import logger from 'redux-logger';

const rootReducer = combineReducers({
    userStatus: userStatusReducer,
    users: userReducer
  });

const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true, traceLimit: 25
}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk)
);

const store = createStore(rootReducer, enhancer);
  
export default store;