import { ERROR,
GET_CURRENCIES,
SAVE_EXPENSE,
DELETE_EXPENSE,
SEND_EXPENSE_TO_EDIT,
EDIT_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseToEdit: {},
  editing: false,
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
  case SEND_EXPENSE_TO_EDIT: return {
    ...state,
    expenseToEdit: action.payload,
    editing: true,
  };
  case EDIT_EXPENSE: return {
    ...state,
    expenses: state.expenses
      .map((expense) => (expense.id === state.expenseToEdit.id
        ? ({ id: expense.id,
          ...action.payload,
          exchangeRates: expense.exchangeRates })
        : expense)),
    editing: false,
    expenseToEdit: {},
  };
  default: return state;
  }
};

export default wallet;
