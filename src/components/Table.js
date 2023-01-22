import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, sendExpenseToEdit } from '../redux/actions/index';

class Table extends Component {
  handleClickDelete = (id) => {
    const { dispatch, expenses } = this.props;
    dispatch(deleteExpense(expenses.filter((element) => element.id !== id)));
  };

  handleClickEdit = (expenseToEdit) => {
    const { dispatch } = this.props;
    dispatch(sendExpenseToEdit(expenseToEdit));
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
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  { Number(expense.value
                    * (expense.exchangeRates[expense.currency].ask)).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickEdit(expense) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClickDelete(expense.id) }
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
  expenses: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
