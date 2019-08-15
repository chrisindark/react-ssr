import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchAlbum, removeAlbumFromStore} from '../actions/albumActions';
import {fetchPhotosByAlbumId, removePhotosFromStore} from '../actions/photoActions';


class AlbumDetail extends Component {
  componentDidMount() {
    if (this.props.albums && this.props.album.id) {
      fetchPhotosByAlbumId(this.props.album.id)
        .then((res) => {
          console.log(`fetchPhotosByAlbumId then `, res);
        });
    } else {
      // console.log(this.props.match);
      if (this.props.match.params && this.props.match.params.id) {
        fetchAlbum(this.props.match.params.id)
          .then((res) => {
            console.log(`fetchAlbum then `, res);

            if (!res) {
              return;
            }
            fetchPhotosByAlbumId(this.props.match.params.id)
              .then((res) => {
                console.log(`fetchPhotosByAlbumId then `, res);
              });
          })
          .catch((e) => {
            console.log(`fetchPhotosByAlbumId catch `, e);
          });
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {}

  render() {
    if (!this.props.album) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div key={this.props.album.id} style={{padding: '10px'}}>
        <h2 style={{margin: '0px'}}>{this.props.album.title}</h2>

        {this.renderPhotos()}
      </div>
    );
  }

  renderPhotos = () => {
    if (!this.props.photos && !this.props.photos.length) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div>
        <p>Photos:</p>
        {this.props.photos.map((p, index) => this.renderPhoto(p, index))}
      </div>
    )
  };

  renderPhoto = (p, index) => {
    return (
      <div key={p.id} style={{padding: '10px'}}>
        <p style={{margin: '0px'}}>{p.title}</p>
        <img style={{margin: '0px'}} src={p.thumbnailUrl} alt={'thumbnailUrl'} />
      </div>
    )
  };

  componentWillUnmount() {
    removeAlbumFromStore();
    removePhotosFromStore();
  }
}

const mapStateToProps = state => ({
  album: state.albums.album,
  photos: state.photos.photos
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumDetail));
