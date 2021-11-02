/* eslint-disable no-param-reassign */
import * as actions from '../actions/actionsTypes';

const initialState = { user: {}, favourites: [], jwt_token: '' };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      state = {
        ...state,
        user: action.payload,
      };
      console.log('inside reducer', state);
      break;
    case actions.LOGOUT:
      state = initialState;
      break;
    case actions.GET_CUSTOMER:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    case actions.SET_FAVOURITES:
      state = {
        ...state,
        favourites: action.payload,
      };
      break;
    case actions.SET_JWT_TOKEN:
      state = {
        ...state,
        jwt_token: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default reducer;
