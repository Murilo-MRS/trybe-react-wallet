import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div>
          <div data-testid="email-field">{email}</div>
          <div className="header-currency-info">
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
