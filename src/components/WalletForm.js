import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
            type="number"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
          >
            {
              currencies.map((currency, index) => (
                <option key={ index } value="">{ currency }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
            id="description-input"
            type="text"
          />
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
