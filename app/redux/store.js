import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage'

import thunk from 'redux-thunk';

import reducers from './rootReducer'; //Import the root reducer

const middlewares = [];

middlewares.push(thunk);
if (__DEV__) {
  middlewares.push(createLogger());
}

const persistConfig = {
  key: 'bsmku',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

let store = createStore(
			  persistedReducer,
			  undefined,
			  compose(applyMiddleware(...middlewares)),
		  );
export default store;