import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      isLoading: false,
      // favorites: [],
    };
  }

  // func chamada pela handleCheck; chama addSong que favorita a música (req 8)
  favoriteSongs = () => {
    const { song } = this.props;
    const { checked } = this.state;
    if (checked) {
      this.setState({ isLoading: true }, async () => {
        await addSong(song);
        // const favesLocalStorage = await getFavoriteSongs();
        this.setState({ isLoading: false });
      });
    }
  };

  // func chamada ao clicar no checkbox Favorita (req 8)
  handleCheck = ({ target }) => {
    if (target.checked) {
      this.setState({ checked: true }, () => this.favoriteSongs());
    } else {
      this.setState({ checked: false });
    }
  };

  render() {
    const {
      // songs,
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const { isLoading } = this.state;

    return (
      <div>
        {/* {songs.filter((music) => music !== songs[0]).map((song) => (
          <div
            key={ song.trackId }
          >
            <p>{song.trackName}</p>

            <audio
              data-testid="audio-component"
              src={ song.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio> */}

        <p>{trackName}</p>

        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        <label
          htmlFor={ `${trackName}` }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            name={ `${trackName}` }
            onChange={ this.handleCheck }
          />
        </label>
        {isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
