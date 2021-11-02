/* eslint-disable no-param-reassign */
import * as actions from '../actions/actionsTypes';

const initialState = {
  currentRestaurant: {}, dish: {}, restaurants: [], dishes: [], dishAction: '', customerId: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_RESTAURANT:
      state = {
        ...state,
        currentRestaurant: action.payload,
      };
      break;
    case actions.SET_ALL_RESTAURANT:
      state = {
        ...state,
        restaurants: action.payload,
      };
      break;
    case actions.SET_ALL_DISH:
      state = {
        ...state,
        dishes: action.payload,
      };
      break;
    case actions.SET_DISH:
      state = {
        ...state,
        dish: action.payload,
      };
      break;
    case actions.CLEAR_RESTAURANT:
      state = initialState;
      break;
    case actions.SET_DISH_ACTION:
      state = {
        ...state,
        dishAction: action.payload,
      };
      break;
    case actions.SET_CUSTOMER_ID:
      state = {
        ...state,
        customerId: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default reducer;
