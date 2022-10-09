import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header
        className="block is-flex
      is-justify-content-space-between mx-6 is-align-items-center"
      >
        <div className="block" data-testid="email-field">
          <h3 className="title is-1 is-unselectable">
            Trybe
            <span className="app-name">Wallet</span>
          </h3>
          <p className="is-size-5">
            {email}
          </p>
        </div>
        <div
          className="
        is-flex is-flex-direction-column has-text-white is-size-4
        is-justify-content-center is-align-items-center box total-expenses-container"
        >
          <p className="has-text-weight-bold">Despesa Total: </p>
          <div data-testid="total-field">
            {expenses.length === 0
              ? (0).toFixed(2)
              : expenses
                .reduce(
                  (acc, curr) => parseFloat(
                    curr.value * curr.exchangeRates[curr.currency].ask,
                  ) + acc,
                  0,
                )
                .toFixed(2)}
          </div>
          <div data-testid="header-currency-field">BRL</div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
