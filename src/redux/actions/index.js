import {
  USER,
  ERROR,
  GET_CURRENCIES,
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  SEND_EXPENSE_TO_EDIT,
  EDIT_EXPENSE,
} from './actionTypes';
import fetchApi from '../../services/walletApi';

const receiveError = (errorMessage) => ({
  type: ERROR,
  payload: errorMessage,
});

export const loginUser = (email) => async (dispatch) => {
  dispatch({
    type: USER,
    payload: email,
  });
};

export const getCurrencies = () => async (dispatch) => {
  try {
    const currencies = Object.keys(await fetchApi());
    currencies.splice(currencies.indexOf('USDT'), 1);

    dispatch({
      type: GET_CURRENCIES,
      payload: currencies,
    });
  } catch (error) {
    dispatch(receiveError(error));
  }
};

export const saveExpense = (expense) => async (dispatch) => {
  try {
    dispatch({
      type: SAVE_EXPENSE,
      payload: expense,
    });
  } catch (error) {
    dispatch(receiveError(error));
  }
};

export const deleteExpense = (expenses) => async (dispatch) => {
  dispatch({
    type: DELETE_EXPENSE,
    payload: expenses,
  });
};

export const sendExpenseToEdit = (expenseToEdit) => async (dispatch) => {
  dispatch({
    type: SEND_EXPENSE_TO_EDIT,
    payload: expenseToEdit,
  });
};

export const editExpense = (expenseInfo) => async (dispatch) => {
  dispatch({
    type: EDIT_EXPENSE,
    payload: expenseInfo,
  });
};
