import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(`expensesValues: ${Object.values(expenses)}`);
    console.log(`chaves das expenses: ${Object.keys(expenses)}`);

    const sum = Object.values(expenses)
      .reduce((acc, currExpense) => acc
      + (currExpense.value * currExpense.exchangeRates[currExpense.currency].ask), 0);

    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ sum.toFixed(2) ?? 0 }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
