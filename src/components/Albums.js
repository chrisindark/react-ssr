import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getPostDetail} from '../actions/postActions';


class Albums extends Component {
  render () {
    return (
      <div>
        <p>Albums</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPostDetail
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
