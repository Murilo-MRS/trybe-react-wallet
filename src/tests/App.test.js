import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { renderWithRedux, renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Header from '../components/Header';
import App from '../App';
import Wallet from '../pages/Wallet';

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
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const btnAddExpense = screen.getByRole('button', { name: /Adicionar despesa/i });
    const table = screen.getByRole('table');

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(btnAddExpense).toBeInTheDocument();
    expect(table).toBeInTheDocument();

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'dois dolares');
    userEvent.click(btnAddExpense);

    const btnRemoveExpense = await screen.findByTestId('delete-btn');
    const btnEditExpense = await screen.findByTestId('edit-btn');
    const tableRow = await screen.findByRole('row', {
      name: /dois dolares alimentação dinheiro 2\.00 dólar americ/i,
    });
    expect(btnRemoveExpense).toBeInTheDocument();
    expect(btnEditExpense).toBeInTheDocument();
    expect(tableRow).toBeInTheDocument();

    userEvent.click(btnEditExpense);

    const btnFinishEdit = await screen.getByRole('button', { name: /Editar despesa/i });
    expect(btnFinishEdit).toBeInTheDocument();

    userEvent.click(btnFinishEdit);

    userEvent.click(btnRemoveExpense);
    expect(tableRow).not.toBeInTheDocument();
  });
});
