/* eslint-disable no-param-reassign */
import * as actions from '../actions/actionsTypes';

const initialState = { items: [], address: {}, mode: '' };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_CART:
      state = {
        ...state,
        items: action.payload,
      };
      console.log('inside reducer', state);
      break;
    case actions.SET_DELIVERY_ADDRESS:
      state = {
        ...state,
        address: action.payload,
      };
      break;
    case actions.CLEAR_CART:
      state = initialState;
      break;
    case actions.SET_MODE:
      state = {
        ...state,
        mode: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default reducer;
