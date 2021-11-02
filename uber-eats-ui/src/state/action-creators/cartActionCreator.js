/* eslint-disable no-undef */
import * as actions from '../actions/actionsTypes';

export const updateCart = (dish) => async (dispatch) => {
  await dispatch({
    type: actions.UPDATE_CART,
    payload: dish,
  });
};

export const setDeliveryAddress = (address) => async (dispatch) => {
  await dispatch({
    type: actions.SET_DELIVERY_ADDRESS,
    payload: address,
  });
};

export const setMode = (mode) => async (dispatch) => {
  await dispatch({
    type: actions.SET_MODE,
    payload: mode,
  });
};

export const clearCart = () => async (dispatch) => {
  await dispatch({
    type: actions.CLEAR_CART,
  });
};
