// Coloque aqui suas actions
export const EMAIL_ACTION = 'EMAIL_ACTION';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const FAILED_REQUEST = 'FAILED_REQUEST';
const url = 'https://economia.awesomeapi.com.br/json/all';

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
    const valuesCurrency = Object.values(result);
    const filtered = valuesCurrency.filter((e) => e.codein !== 'BRLT');
    dispatch(getCurrencies(filtered));
  } catch (e) {
    throw new Error(e);
  }
};
