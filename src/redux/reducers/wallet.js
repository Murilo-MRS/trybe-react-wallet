// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, RECEIVE_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return { ...state };
  case RECEIVE_CURRENCY:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}
export default walletReducer;
