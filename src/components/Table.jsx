import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenseAction, removeExpenseAction } from '../redux/actions';
// import '../styles/Table.css';

class Table extends Component {
  handleDelete = ({
    target: {
      parentElement: {
        parentElement: { parentElement },
      },
    },
  }) => {
    const { expenses, removeExpenseDispatch } = this.props;
    const deletedExpense = expenses.filter(
      (e) => e.id !== Number(parentElement.id),
    );
    removeExpenseDispatch(deletedExpense);
  };

  handleEdit = ({
    target: {
      parentElement: { parentElement },
    },
  }) => {
    // AJUDA DA CAREN PONTES TRIBO 24-A
    const { editExpenseDispatch } = this.props;
    editExpenseDispatch(Number(parentElement.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="box table-container mx-6 is-flex">
        <table className="table is-fullwidth is-hoverable">
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
                  <div className="buttons">
                    <button
                      data-testid="edit-btn"
                      type="button"
                      className="button is-info is-small is-rounded"
                      onClick={ this.handleEdit }
                    >
                      {/* <span className="icon is-small">
                        <i className="fas fa-pen" />
                      </span> */}
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      className="button is-danger is-small is-rounded"
                      onClick={ this.handleDelete }
                    >
                      {/* <span className="icon is-small">
                        <i className="fas fa-trash" />
                      </span> */}
                    </button>
                  </div>
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
