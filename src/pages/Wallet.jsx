import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <main className="wallet-page is-flex is-flex-direction-column ">
        <section className="box mx-6">
          <Header />
          <WalletForm />
        </section>
        <section className="expenses-table my-6">
          <Table />
        </section>
        <section className="section is-large" />
      </main>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
