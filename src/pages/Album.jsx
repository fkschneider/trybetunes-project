import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      artist: '',
      album: '',
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  // request dos álbuns e atualização de estado (req 7)
  getAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const fullAlbum = await getMusics(id);
    this.setState({
      songs: fullAlbum,
      artist: fullAlbum[0].artistName,
      album: fullAlbum[0].collectionName,
    });
  };

  render() {
    const { artist, album, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">{artist}</p>
          <p data-testid="album-name">{album}</p>
          <MusicCard songs={ songs } />
          {/* {songs.filter((element) => element !== songs[0]).map((song) => {
            <MusicCard
              trackName={song.trackName}
              previewUrl={song.previewUrl}
              key={song.trackId}
            />
          })} */}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
