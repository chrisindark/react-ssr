import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Waypoint} from 'react-waypoint';

import {fetchPosts, removePostFromStore} from '../actions/postActions';
import {getPostDetail} from '../actions/postActions';


class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 0,
      limit: 10,
      totalCount: 0
    };
  }

  componentDidMount() {
    const { posts } = this.props;

    // console.log('posts', posts);
    // called only on client side.
    // Use this or other logical checks that
    // tell us if this data has not loaded already
    if (posts.length === 0) {
      fetchPosts()
        .then((res) => {
          console.log(`fetchPosts then `, res);
        });
    } else {
      const newState = {
        posts: this.props.posts.slice(0, 10),
        totalCount: this.props.postsTotalCount,
        page: 1,
        limit: 10
      };
      this.setState(newState);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('here', nextProps);
    if (nextProps.posts.length > 0 && this.props.posts.length === 0) {
      const newState = {
        posts: nextProps.posts.slice(0, 10),
        totalCount: nextProps.postsTotalCount,
        page: 1,
        limit: 10
      };
      this.setState(newState);
    }
  }

  render() {
    const { posts } = this.state;
    if (this.props.posts.length === 0) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        {posts.map((p, index) => this.renderPost(p, index))}

        <Waypoint onEnter={this.onEnter} onLeave={this.onLeave} />
      </div>
    );
  }

  renderPost = (p, index) => {
    return (
      <div key={index} style={{padding: '10px'}}>
        <Link to={`/posts/${p.id}`} onClick={(e) => this.onClick(p)}>
          <p style={{margin: '0px'}} key={p.id}>{p.title}</p>
        </Link>
      </div>
    );
  };

  onEnter = () => {
    // console.log('entered');
    const startIndex = this.state.page * this.state.limit;
    const endIndex = (this.state.page + 1) * this.state.limit;

    if (startIndex <= this.props.postsTotalCount) {
      const newState = {
        posts: this.state.posts.concat(this.props.posts.slice(startIndex, endIndex)),
        page: this.state.page + 1,
      };
      this.setState(newState);
    }
  };

  onLeave = () => {
    // console.log('left');
  };

  onClick = (p) => {
    this.props.getPostDetail(p);
  };
}

// map posts from redux store
const mapStateToProps = state => ({
  posts: state.posts.posts,
  postsTotalCount: state.posts.totalCount
});

// map api call which can be conditionally triggered
const mapDispatchToProps = dispatch => bindActionCreators({
  getPostDetail
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
