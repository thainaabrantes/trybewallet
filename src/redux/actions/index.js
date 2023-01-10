import { USER, CURRENCIES } from './actionTypes';
import fetchCurrencies from '../../services/walletApi';

const saveUser = (email) => ({
  type: USER,
  payload: email,
});

export const loginUser = (email) => async (dispatch) => {
  dispatch(saveUser(email));
};

export const getCurrencies = () => async (dispatch) => {
  try {
    const response = await fetchCurrencies();
    const currencies = Object.keys(response);
    currencies.splice(currencies.indexOf('USDT'), 1);

    dispatch({
      type: CURRENCIES,
      payload: currencies,
    });
  } catch (error) {
    dispatch();
  }
};
