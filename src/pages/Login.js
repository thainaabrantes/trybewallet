import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginUser from '../redux/actions/index';

class Login extends React.Component {
  state = {
    isLoginButtonDisabled: true,
    email: '',
    passwordValue: '',
  };

  enableLoginButton = () => {
    const { email, passwordValue } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const minLength = 5;
    const validEmail = regex.test(email);
    const validPassword = passwordValue.length > minLength;

    if (validEmail && validPassword) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableLoginButton);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(loginUser(email));
    history.push('/carteira');
  };

  render() {
    const { isLoginButtonDisabled, email, passwordValue } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="passwordValue"
            value={ passwordValue }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ isLoginButtonDisabled }
          >
            ENTRAR
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
