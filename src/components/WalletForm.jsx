import React, { Component } from 'react';

class WalletForm extends Component {
  state = {
    valueInput: 0,
    description: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyInput);
  };

  render() {
    const { valueInput, description } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            type="number"
            name="valueInput"
            value={ Number(valueInput) }
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
            id="value-input"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
      </form>
    );
  }
}

export default WalletForm;
