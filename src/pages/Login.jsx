import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { emailAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyInput);
  };

  verifyInput = () => {
    const { email, password } = this.state;
    const minLenght = 6;
    const testValidation = /\S+@\S+\.\S+/;

    const emailValidation = testValidation.test(email);
    if (emailValidation && password.length >= minLenght) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { emailToStore, history } = this.props;
    emailToStore(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, btnDisabled } = this.state;

    return (
      <div>
        <label htmlFor="email-input">
          Email:
          <input
            type="text"
            name="email"
            id="email-input"
            onChange={ this.handleChange }
            data-testid="email-input"
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            type="password"
            name="password"
            id="password-input"
            onChange={ this.handleChange }
            data-testid="password-input"
            value={ password }
          />
        </label>
        <button type="button" disabled={ btnDisabled } onClick={ this.handleClick }>
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  emailToStore: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  emailToStore: (state) => dispatch(emailAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
