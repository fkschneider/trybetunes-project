import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      artist: '',
      album: ''
    }
  }

  componentDidMount() {
    this.getAlbum()
  }

  getAlbum = async () => {
    const { songs } = this.state;
    const { match: { params: { id } } } = this.props;
    const fullAlbum = await getMusics(id);
    this.setState({ 
      songs: fullAlbum, 
      // artist: songs[0].artistName, 
      // album: songs[0].albumName 
    });
    console.log(songs);
  }

  render() {
    const { artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">{artist}</p>
          <p data-testid="album-name">{album}</p>
        </div>
      </div>
    );
  }
}

export default Album;
