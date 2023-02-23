import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.userInfo();
  }

  // pega o nome do usuário e exibe na tela (req 3)
  userInfo = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      name: user.name,
      isLoading: false,
    });
  };

  render() {
    const {
      name,
      isLoading,
    } = this.state;

    if (isLoading) return <Loading />;

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{name}</p>
      </header>
    );
  }
}

export default Header;
