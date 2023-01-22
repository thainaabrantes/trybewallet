import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, saveExpense, editExpense } from '../redux/actions/index';
import fetchApi from '../services/walletApi';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentacao',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  // Teste para adicionar os valores nos inputs ao clicar em editar despesa.
  // Ainda não funciona pq está entrando em loop.
  // componentDidUpdate(editing) {
  //   if (editing) {
  //     const { expenseToEdit } = this.props;

  //     this.setState({
  //       value: expenseToEdit.value,
  //       currency: expenseToEdit.currency,
  //       method: expenseToEdit.method,
  //       tag: expenseToEdit.tag,
  //       description: expenseToEdit.description,
  //     });
  //   }
  // }

  handleExpense = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch } = this.props;

    const response = await fetchApi();
    delete response.USDT;

    dispatch(saveExpense({ ...this.state, exchangeRates: response }));

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      description: '',
    }));
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const { value, currency, method, tag, description } = this.state;
    dispatch(editExpense({ value, currency, method, tag, description }));

    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      description: '',
    });
  };

  render() {
    const { currencies, editing } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
            type="number"
            value={ value }
            name="value"
            onChange={ this.handleExpense }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.handleExpense }
          >
            {
              currencies.map((currencyItem, index) => (
                <option key={ index } value={ currencyItem }>{ currencyItem }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            value={ method }
            name="method"
            onChange={ this.handleExpense }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleExpense }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
            id="description-input"
            type="text"
            value={ description }
            name="description"
            onChange={ this.handleExpense }
          />
        </label>
        <button
          type="button"
          onClick={ !editing ? this.handleClick : this.handleEditClick }
        >
          {!editing ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  editing: PropTypes.bool.isRequired,
  // expenseToEdit: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editing: state.wallet.editing,
  // expenseToEdit: state.wallet.expenseToEdit,
});

export default connect(mapStateToProps)(WalletForm);
