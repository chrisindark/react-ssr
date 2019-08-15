import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchPosts} from './actions/postActions';
import {fetchAlbums} from './actions/albumActions';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // console.log(this.props);
    if (this.props.location.pathname === '/') {
      this.props.history.push('/posts');
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  render() {
    return (
      <div>
        <h2 className="home">Home</h2>
      </div>
    )
  }
}

// static declaration for SSR
// returns an array of actions to dispatch
Home.serverSideFetch = () => {
    return [
        fetchPosts,
        fetchAlbums
    ];
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
