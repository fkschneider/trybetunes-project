import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      faves: [],
    };
  }

  componentDidMount() {
    this.lovedTracks();
  }

  lovedTracks = async () => {
    this.setState({ isLoading: true });
    const likedSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, faves: likedSongs });
  };

  render() {
    const { isLoading, faves } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <span>{isLoading && <Loading />}</span>
        <ul>
          {faves.map((fav) => (
            <div
              key={ fav.trackId }
            >
              <p>{fav.trackName}</p>
              <audio
                data-testid="audio-component"
                src={ fav.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label
                htmlFor={ `${fav.trackName}` }
              >
                Favorita
                <input
                  type="checkbox"
                  name={ `${fav.trackName}` }
                  checked
                />
              </label>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Favorites;
