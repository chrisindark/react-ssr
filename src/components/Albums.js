import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Waypoint} from "react-waypoint";

import {fetchAlbums, getAlbumDetail} from '../actions/albumActions';


class Albums extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      page: 0,
      limit: 10,
      totalCount: 0
    };
  }

  componentDidMount() {
    const { albums } = this.props;

    if (albums.length === 0) {
      fetchAlbums()
        .then((res) => {
          console.log(`fetchAlbums then `, res);
        });
    } else {
      const newState = {
        albums: this.props.albums.slice(0, 10),
        totalCount: this.props.albumsTotalCount,
        page: 1,
        limit: 10
      };
      this.setState(newState);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('here', nextProps);
    if (nextProps.albums.length > 0 && this.props.albums.length === 0) {
      const newState = {
        albums: nextProps.albums.slice(0, 10),
        totalCount: nextProps.albumsTotalCount,
        page: 1,
        limit: 10
      };
      this.setState(newState);
    }
  }

  render () {
    const { albums } = this.state;
    if (this.props.albums.length === 0) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        {albums.map((a, index) => this.renderAlbum(a, index))}

        <Waypoint onEnter={this.onEnter} onLeave={this.onLeave} />
      </div>
    );
  }

  renderAlbum = (a, index) => {
    return (
      <div key={index} style={{padding: '10px'}}>
        <Link to={`/albums/${a.id}`} onClick={(e) => this.onClick(a)}>
          <p style={{margin: '0px'}} key={a.id}>{a.title}</p>
        </Link>
      </div>
    );
  };

  onEnter = () => {
    // console.log('entered');
    const startIndex = this.state.page * this.state.limit;
    const endIndex = (this.state.page + 1) * this.state.limit;

    if (startIndex <= this.props.albumsTotalCount) {
      const newState = {
        albums: this.state.albums.concat(this.props.albums.slice(startIndex, endIndex)),
        page: this.state.page + 1,
      };
      this.setState(newState);
    }
  };

  onLeave = () => {
    // console.log('left');
  };

  onClick = (a) => {
    this.props.getAlbumDetail(a);
  };
}

Albums.serverSideFetch = () => {
  return [
    fetchAlbums
  ];
};

const mapStateToProps = state => ({
  albums: state.albums.albums,
  albumsTotalCount: state.albums.totalCount
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAlbumDetail
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
