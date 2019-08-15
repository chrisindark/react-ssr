import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Waypoint} from 'react-waypoint';

import {fetchPosts} from './actions';
import Posts from './components/Posts';


class Home extends Component {
  constructor(props) {
    super(props);
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
        // other API calls needed
    ];
};

// map posts from redux store
const mapStateToProps = state => ({
  posts: state.posts.posts,
  postsTotalCount: state.posts.totalCount
});

// map api call which can be conditionally triggered
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
