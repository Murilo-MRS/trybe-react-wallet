// Coloque aqui suas actions
export const EMAIL_ACTION = 'EMAIL_ACTION';

export const emailAction = (email) => ({
  type: EMAIL_ACTION,
  payload: {
    email,
  },
});
