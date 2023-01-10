import { CURRENCIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES: return {
    ...state,
    currencies: action.payload,
  };
  default: return state;
  }
};

export default wallet;
