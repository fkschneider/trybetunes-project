import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      onChange,
      checked,
    } = this.props;
    console.log(checked);

    return (
      <div>
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
        </div>

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
        >
          Favorita
          <input
            type="checkbox"
            name={ `${trackName}` }
            onChange={ onChange }
            checked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
};

export default MusicCard;
