import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  // func that renders favorite songs on page Favorites;
  lovedTracks = async () => {
    this.setState({ isLoading: true });
    const likedSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, faves: likedSongs });
  };

  // checks if song is favorite
  checked = (fav) => {
    const { faves } = this.state;
    return faves.some((music) => fav.trackId === music.trackId);
  };

  // func called when checkbox Favorita is clicked; removes songs from favorites list (req 12);
  onClick = async (target, song) => {
    // console.log(target.checked, song);
    this.setState({ isLoading: true });
    if (target.checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    const lovedSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, faves: lovedSongs });
  };

  render() {
    const { isLoading, faves } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <span>{isLoading && <Loading />}</span>
        <ul>
          {faves.map((fav, index) => (
            <div
              key={ index }
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
                htmlFor={ `${fav.trackId}` }
              >
                Favorita
                <input
                  type="checkbox"
                  id={ fav.trackId }
                  name={ `${fav.trackName}` }
                  data-testid={ `checkbox-music-${fav.trackId}` }
                  checked={ this.checked(fav) }
                  onChange={ ({ target }) => this.onClick(target, fav) }
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
