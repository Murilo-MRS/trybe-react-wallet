import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenseAction, removeExpenseAction } from '../redux/actions';
// import '../styles/Table.css';

class Table extends Component {
  handleDelete = ({ target: { parentElement: { parentElement } } }) => {
    const { expenses, removeExpenseDispatch } = this.props;
    const deletedExpense = expenses.filter((e) => e.id !== Number(parentElement.id));
    removeExpenseDispatch(deletedExpense);
  };

  handleEdit = ({ target: { parentElement: { parentElement } } }) => {
    // AJUDA DA CAREN PONTES TRIBO 24-A
    const { editExpenseDispatch } = this.props;
    editExpenseDispatch(Number(parentElement.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={ e.id } id={ e.id }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{Number(e.value).toFixed(2)}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(e.exchangeRates[e.currency].ask * e.value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ this.handleEdit }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ this.handleDelete }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  editExpenseDispatch: (id) => dispatch(editExpenseAction(id)),
  removeExpenseDispatch: (array) => dispatch(removeExpenseAction(array)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
