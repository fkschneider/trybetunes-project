import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
      isLoading: false,
      inputArtist: '',
      searchedAlbums: [],
      userSearch: '',
    };
  }

  // validação do botão Pesquisar/atualizar estado inputArtist (req 5 e 6)
  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputArtist: value });
    if (value.length >= 2) {
      this.setState({ isSearchButtonDisabled: false });
    }
  };

  // busca álbuns pelo artista (req 6)
  handleAlbums = async () => {
    const { inputArtist } = this.state;
    this.setState({ isLoading: true, userSearch: inputArtist });
    const searchAlbumsByArtist = await searchAlbumsAPI(inputArtist);
    this.setState({
      isLoading: false,
      searchedAlbums: searchAlbumsByArtist,
      inputArtist: '' });
  };

  render() {
    const {
      isSearchButtonDisabled,
      isLoading,
      searchedAlbums,
      userSearch,
      inputArtist,
    } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="inputArtist">
          <input
            type="text"
            name="inputArtist"
            value={ inputArtist }
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isSearchButtonDisabled }
          onClick={ this.handleAlbums }
        >
          Pesquisar
        </button>
        <span>
          {searchedAlbums.length === 0 ? <p>Nenhum álbum foi encontrado</p>
            : (
              <p>
                {`Resultado de álbuns de: ${userSearch}`}
              </p>
            )}
        </span>
        <div>
          <ul>
            {searchedAlbums.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
              >
                <li>{album.collectionName}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
