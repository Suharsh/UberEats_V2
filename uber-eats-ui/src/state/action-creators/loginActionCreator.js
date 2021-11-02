import * as actions from '../actions/actionsTypes';

const setUser = (user) => {
  console.log('inside set user', user);
  return {
    type: actions.LOGIN,
    payload: user,
  };
};

const updateUser = (user) => {
  console.log('inside set user', user);
  return {
    type: actions.GET_CUSTOMER,
    payload: user,
  };
};

const doLogoutUser = () => ({
  type: actions.LOGOUT,
  payload: {},
});

const setFavourites = (favourites) => ({
  type: actions.GET_CUSTOMER,
  payload: favourites,
});

const setJwtToken = (token) => ({
  type: actions.SET_JWT_TOKEN,
  payload: token,
});

export {
  setUser, updateUser, doLogoutUser, setFavourites, setJwtToken as default,
};
