import { ERROR, GET_CURRENCIES, SAVE_EXPENSE, DELETE_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ERROR: return {
    ...state,
    error: action.payload,
  };
  case GET_CURRENCIES: return {
    ...state,
    currencies: action.payload,
  };
  case SAVE_EXPENSE: return {
    ...state,
    expenses: [...state.expenses, action.payload],
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: action.payload,
  };
  default: return state;
  }
};

export default wallet;
