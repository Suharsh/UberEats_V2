/* eslint-disable max-len */
import * as actions from '../actions/actionsTypes';

const setRestaurant = (restaurant) => async (dispatch) => {
  await dispatch({
    type: actions.SET_RESTAURANT,
    payload: restaurant,
  });
};

const setAllRestaurants = (restaurants) => async (dispatch) => {
  await dispatch({
    type: actions.SET_ALL_RESTAURANT,
    payload: restaurants,
  });
};

const setAllDishes = (dishes) => async (dispatch) => {
  await dispatch({
    type: actions.SET_ALL_DISH,
    payload: dishes,
  });
};

const setDish = (dish) => async (dispatch) => {
  await dispatch({
    type: actions.SET_DISH,
    payload: dish,
  });
};

const clearRestaurant = () => async (dispatch) => {
  await dispatch({
    type: actions.CLEAR_RESTAURANT,
  });
};

const setDishAction = (action) => async (dispatch) => {
  await dispatch({
    type: actions.SET_DISH_ACTION,
    payload: action,
  });
};

const setCustomerId = (customerId) => async (dispatch) => {
  await dispatch({
    type: actions.SET_CUSTOMER_ID,
    payload: customerId,
  });
};
export {
  setRestaurant, setAllRestaurants, setAllDishes, setDish, clearRestaurant, setDishAction, setCustomerId as default,
};
