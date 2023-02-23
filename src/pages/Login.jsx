import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isSaveButtonDisabled: true,
      isLoading: false,
    };
  }

  // aciona a validação do botão Entrar (req 2)
  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({ isSaveButtonDisabled: this.validateButton() });
    });
  };

  // faz com que o botão Entrar só funcione depois de 3 caracteres (req 2)
  validateButton = () => {
    const { name } = this.state;
    const minNum = 3;
    const nameButton = name.length < minNum;
    return nameButton;
  };

  // func acionada ao clicar o botão Entrar (req 2)
  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name });
    history.push('/search');
  };

  render() {
    const {
      name,
      isSaveButtonDisabled,
      isLoading,
    } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-login">
        <label htmlFor="login-input">
          Nome
          <input
            data-testid="login-name-input"
            type="text"
            id="login-input"
            name="name"
            value={ name }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          disabled={ isSaveButtonDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
