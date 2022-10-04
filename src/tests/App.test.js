import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { renderWithRedux, renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Header from '../components/Header';
import App from '../App';
import WalletForm from '../components/WalletForm';

describe('Testando a route Login', () => {
  test('teste de rotas /carteira e /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/');
    });
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Teste de input para email e password', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Teste de input para email e password habilitam botão e redireciona para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const btnEntrar = screen.getByText(/entrar/i);
    const testEmail = 'teste@teste.com';
    const testPassword = '123456';

    expect(btnEntrar).toBeDisabled();

    userEvent.type(email, testEmail);
    userEvent.type(password, testPassword);

    expect(btnEntrar).toBeEnabled();
    userEvent.click(btnEntrar);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });

  test('Teste de input para email e password invalido não habilitam botão ', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const btnEntrar = screen.getByText(/entrar/i);

    const testInvalidEmail = 'teste@testecom';
    const testInvalidPassword = '12345';

    userEvent.type(email, testInvalidEmail);
    userEvent.type(password, testInvalidPassword);

    expect(btnEntrar).toBeDisabled();
  });

  test('Teste componente Header', () => {
    renderWithRouterAndRedux(<Header />);
    const totalField = screen.getByTestId('total-field');

    expect(totalField).toBeInTheDocument();
  });

  test('Teste componente WalletForm', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const btnAddExpense = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(btnAddExpense).toBeInTheDocument();

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'dois dolares');
    // userEvent.selectOptions();
    userEvent.click(btnAddExpense);
    // await expect().toBe('2');

    // botao de editar aparece

    // botao de apagar aparece
  });
});
