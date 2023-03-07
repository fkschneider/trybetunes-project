import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      artist: '',
      album: '',
      isLoading: true,
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
      isLoading: false,
      songs: fullAlbum,
      artist: fullAlbum[0].artistName,
      album: fullAlbum[0].collectionName,
      faveSongs: [],
    });
  };

  // func chamada ao clicar no checkbox Favorita (req 8)
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

  // func chamada pela handleCheck; chama addSong que favorita a música (req 8)
  favoriteSongs = (song) => {
    this.setState({ isLoading: true }, async () => {
      await addSong(song);
      const faveSongs = await getFavoriteSongs();
      this.setState({ isLoading: false, faveSongs });
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
