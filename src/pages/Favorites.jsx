import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isLoading: false,
  //   };
  // }

  // deleteFavorite = async () => {
  //   const { song } = this.props;
  //   this.setState({ isLoading: true }, async () => {
  //     await removeSong(song);
  //     this.setState({ isLoading: false });
  //   });
  // };

  render() {
    // const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {/* <span>{isLoading ? <Loading />
        :
        }</span> */}
      </div>
    );
  }
}

export default Favorites;
