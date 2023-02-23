import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    // console.log(value);
    if (value.length >= 2) {
      this.setState({ isSearchButtonDisabled: false });
    }
  };

  render() {
    const {
      isSearchButtonDisabled,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-input">
          <input
            type="text"
            name="search-input"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isSearchButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
