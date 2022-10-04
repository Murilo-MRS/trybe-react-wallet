// Coloque aqui suas actions
export const EMAIL_ACTION = 'EMAIL_ACTION';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const FAILED_REQUEST = 'FAILED_REQUEST';
const url = 'https://economia.awesomeapi.com.br/json/all';

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const emailAction = (email) => ({
  type: EMAIL_ACTION,
  payload: {
    email,
  },
});

function requestCurrencies() {
  return { type: REQUEST_CURRENCY };
}

function getCurrencies(payload) {
  return { type: RECEIVE_CURRENCY, payload };
}

export const fetchCurrency = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies());
    const response = await fetch(url);
    const result = await response.json();
    const valuesCurrency = Object.keys(result);
    const filtered = valuesCurrency.filter((e) => e !== 'USDT');
    dispatch(getCurrencies(filtered));
  } catch (e) {
    throw new Error(e);
  }
};

export const expenseAction = (state, currencies) => ({
  type: SAVE_EXPENSES,
  payload: {
    id: state.id,
    value: state.valueInput,
    description: state.description,
    currency: state.currencySelect,
    method: state.methodSelect,
    tag: state.tagSelect,
    exchangeRates: currencies,
  },
});

export const addExpense = (obj) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  dispatch(expenseAction(obj, data));
};
