import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { emailAction } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
    loggedIn: false,
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
    const { emailToStore } = this.props;
    emailToStore(email);
    // history.push('/carteira');
    this.setState({ loggedIn: true });
  };

  render() {
    const { email, password, btnDisabled, loggedIn } = this.state;

    return (
      <main className="is-flex main-container is-justify-content-center">
        <section className="is-align-self-center">
          <section className="box m-6 p-auto">
            <h1 className="title is-1 has-text-centered">
              Trybe
              <span className="title is-1 app-name">Wallet</span>
            </h1>
          </section>
          <section className="box m-6 p-6 is-align-self-center">
            <h1 className="title is-1">Sign in</h1>
            <label className="" htmlFor="email-input">
              Email:
              <input
                type="text"
                name="email"
                id="email-input"
                onChange={ this.handleChange }
                data-testid="email-input"
                value={ email }
                className="input my-2 is-success"
              />
            </label>
            <label className="" htmlFor="password-input">
              Password:
              <input
                type="password"
                name="password"
                id="password-input"
                onChange={ this.handleChange }
                data-testid="password-input"
                className="input my-2 is-success"
                value={ password }
              />
            </label>
            <button
              type="button"
              disabled={ btnDisabled }
              onClick={ this.handleClick }
              className="button mt-2 is-success is-fullwidth"
            >
              Entrar
            </button>
            {loggedIn && <Redirect to="/carteira" />}
          </section>
        </section>
        <section className="hero image-container is-fullheight">
          <div className="hero-body">
            <img
              src="https://img.freepik.com/free-vector/laptop-with-money-rocket-cartoon-vector-icon-illustration-technology-business-icon_138676-1971.jpg?w=740&t=st=1665254469~exp=1665255069~hmac=9ec52a875b13420170a0f5da06f75f070834a2a852ed2818fe37718556fef885"
              className="image is-align-self-center"
              alt="money"
            />
          </div>
        </section>
      </main>
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
