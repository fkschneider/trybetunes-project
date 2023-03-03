import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      songs,
      // trackName,
      // previewUrl,
    } = this.props;

    return (
      <div>
        {songs.filter((element) => element !== songs[0]).map((song) => (
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
            </audio>
          </div>
        ))}

        {/* <h3>{trackName}</h3>

                <audio
                    data-testid="audio-component"
                    src={previewUrl}
                    controls
                >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento{" "}
                    <code>audio</code>.
                </audio> */}
      </div>
    );
  }
}

MusicCard.propTypes = {
  //   trackName: PropTypes.string,
  //   previewUrl: PropTypes.string,
  songs: PropTypes.string.isRequired,
};

export default MusicCard;
