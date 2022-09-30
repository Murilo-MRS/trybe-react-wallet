import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valueInput: '',
    description: '',
    methodSelect: '',
    tagSelect: '',
  };

  componentDidMount() {
    const { fetchCurrencyDispatch } = this.props;
    fetchCurrencyDispatch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { valueInput, description, methodSelect, tagSelect } = this.state;
    const { currenciesProps } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            type="text"
            name="valueInput"
            value={ valueInput }
            step="0.01"
            id="value-input"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="value-input">
          Descrição:
          {' '}
          <input
            type="text"
            name="description"
            value={ description }
            step="0.01"
            id="description-input"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          <select data-testid="currency-input">
            {
              currenciesProps.map((currency) => (
                <option key={ currency } value={ currency }>
                  {currency}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          <select
            name="methodSelect"
            value={ methodSelect }
            onChange={ this.handleChange }
            id="method-input"
            data-testid="method-input"
          >
            <option value="money">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          <select
            name="tagSelect"
            value={ tagSelect }
            onChange={ this.handleChange }
            id="tag-input"
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="freetime">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
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
});

const mapStateToProps = (state) => ({
  currenciesProps: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
