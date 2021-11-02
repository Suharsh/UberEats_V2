import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';
import restaurantReducer from './restaurantReducer';

const reducers = combineReducers({
  login: loginReducer,
  cart: cartReducer,
  restaurant: restaurantReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
