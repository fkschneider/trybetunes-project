import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      account: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ isLoading: true });
    const userInfo = await getUser();
    this.setState({ isLoading: false, account: userInfo });
  };

  render() {
    const { isLoading, account } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading && <Loading />}
        <img
          src={ account.image }
          alt={ account.name }
          data-testid="profile-image"
        />
        <h3>{account.name}</h3>
        <p>{account.email}</p>
        <p>{account.description}</p>
        <Link to="/profile/edit">
          Editar perfil
        </Link>
      </div>
    );
  }
}

export default Profile;
