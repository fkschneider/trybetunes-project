import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      artist: '',
      album: '',
      isLoading: true,
      faveSongs: [],
      savedSongs: [],
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.getAlbum();
    this.favoriteSongs()
  }

  // request dos álbuns e atualização de estado (req 7)
  getAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const fullAlbum = await getMusics(id);
    this.setState({
      isLoading: false,
      songs: fullAlbum,
      artist: fullAlbum[0].artistName,
      album: fullAlbum[0].collectionName,
    });
  };

  //  (req 8)
  // handleCheck = ({ target }) => {
  //   if (target.checked) {
  //     this.setState({ checked: true }, () => this.favoriteSongs());
  //   } else {
  //     this.setState({ checked: false });
  //   }
  // };

  checked = (song) => {
    const { faveSongs } = this.state;
    return faveSongs.some((music) => song.trackId === music.trackId);
  };

  // func chamada ao clicar no checkbox Favorita; chama addSong (req 8)
  favoriteSongs = (song) => {
    this.setState({ isLoading: true }, async () => {
      await addSong(song);
      const heartSongs = await getFavoriteSongs();
      this.setState({ isLoading: false, faveSongs: heartSongs });
    });
  };

  render() {
    const { artist, album, songs, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading />
          : (
            <div>
              <p data-testid="artist-name">{artist}</p>
              <p data-testid="album-name">{album}</p>
              {/* <MusicCard songs={ songs } /> */}
              {songs.filter((element) => element !== songs[0]).map((song) => (
                <MusicCard
                  trackName={ song.trackName }
                  trackId={ song.trackId }
                  previewUrl={ song.previewUrl }
                  key={ song.trackId }
                  // handleCheck={this.handleCheck}
                  favoriteSongs={ () => this.favoriteSongs(song) }
                  checked={ this.checked(song) }
                  faveSongs
                />
              ))}
            </div>
          )}

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
