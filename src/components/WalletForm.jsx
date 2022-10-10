import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, fetchCurrency, editExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    valueInput: '',
    description: '',
    currencySelect: 'USD',
    methodSelect: 'Dinheiro',
    tagSelect: 'Alimentação',
  };

  componentDidMount() {
    const { fetchCurrencyDispatch } = this.props;
    fetchCurrencyDispatch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async (e) => {
    const { addExpenseDispatch } = this.props;
    e.preventDefault();

    addExpenseDispatch(this.state);

    this.resetValues();
  };

  handleEditExpense = async (e) => {
    const { editExpenseDispatch, expenses, idToEditProps } = this.props;
    e.preventDefault();
    const {
      valueInput,
      description,
      currencySelect,
      methodSelect,
      tagSelect,
    } = this.state;

    const editedObjsExchange = expenses.filter((element) => element.id === idToEditProps);
    const oldExchange = editedObjsExchange[0].exchangeRates;
    const exludedObjs = expenses.filter((element) => element.id !== idToEditProps);

    const editedObject = {
      id: idToEditProps,
      value: valueInput,
      description,
      currency: currencySelect,
      method: methodSelect,
      tag: tagSelect,
      exchangeRates: oldExchange,
    };

    const newExpenses = [...exludedObjs, editedObject].sort((a, b) => a.id - b.id);
    editExpenseDispatch(newExpenses);
    this.resetValues();
  };

  resetValues = () => {
    const { id } = this.state;
    this.setState({
      id: id + 1,
      valueInput: '',
      description: '',
      currencySelect: 'USD',
      methodSelect: 'Dinheiro',
      tagSelect: 'Alimentação',
    });
  };

  render() {
    const { valueInput, description, currencySelect,
      methodSelect, tagSelect } = this.state;
    const { currenciesProps, editorProps } = this.props;
    return (
      <form className="field is-horizontal is-grouped is-grouped-centered mx-6">
        <label className="field-label control" htmlFor="value-input">

          <input
            type="text"
            name="valueInput"
            value={ valueInput }
            step="0.01"
            id="value-input"
            data-testid="value-input"
            onChange={ this.handleChange }
            className="input is-medium is-success"
            placeholder="Valor"
          />
        </label>
        <label className="field-label control" htmlFor="description-input">
          <input
            type="text"
            name="description"
            value={ description }
            step="0.01"
            id="description-input"
            data-testid="description-input"
            className="input is-medium is-success"
            onChange={ this.handleChange }
            placeholder="Descrição"
          />
        </label>
        <label className="field-label control" htmlFor="currency-input">
          <div className="select is-success is-medium is-fullwidth">
            <select
              data-testid="currency-input"
              name="currencySelect"
              value={ currencySelect }
              onChange={ this.handleChange }
            >
              {
                currenciesProps.map((currency) => (
                  <option key={ currency } value={ currency }>
                    {currency}
                  </option>
                ))
              }
            </select>
          </div>
        </label>
        <label className="field-label control" htmlFor="method-input">
          <div className="select is-success is-medium is-fullwidth">
            <select
              name="methodSelect"
              value={ methodSelect }
              onChange={ this.handleChange }
              id="method-input"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
        </label>
        <label className="field-label control" htmlFor="tag-input">
          <div className="select is-success is-medium is-fullwidth">
            <select
              name="tagSelect"
              value={ tagSelect }
              onChange={ this.handleChange }
              id="tag-input"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
        </label>
        <div className="control">
          {
            editorProps
              ? (
                <button
                  className="button is-success is-medium"
                  type="button"
                  onClick={ this.handleEditExpense }
                >
                  Editar despesa
                </button>
              )
              : (
                <button
                  className="button is-success is-medium"
                  type="button"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>
              )
          }
        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currenciesProps: PropTypes.shape({
    map: PropTypes.func,
  }),
  fetchCurrencyDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyDispatch: () => dispatch(fetchCurrency()),
  addExpenseDispatch: (state) => dispatch(addExpense(state)),
  editExpenseDispatch: (array) => dispatch(editExpense(array)),
});

const mapStateToProps = (state) => ({
  currenciesProps: state.wallet.currencies,
  editorProps: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEditProps: state.wallet.idToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
