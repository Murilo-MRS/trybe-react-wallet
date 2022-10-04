// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, RECEIVE_CURRENCY, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return { ...state };
  case RECEIVE_CURRENCY:
    return { ...state, currencies: action.payload };
  case SAVE_EXPENSES:
    return { ...state,
      expenses: [...state.expenses,
        {
          ...action.payload,
        }],
    };
  default:
    return state;
  }
}
export default walletReducer;
