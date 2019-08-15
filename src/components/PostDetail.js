import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchPost, removePostFromStore} from '../actions/postActions';
import {fetchCommentsByPostId, removeCommentsFromStore} from '../actions/commentActions';


class PostDetail extends Component {
  componentDidMount() {
    if (this.props.post && this.props.post.id) {
      fetchCommentsByPostId(this.props.post.id)
        .then((res) => {
          console.log(`fetchCommentsByPostId then `, res);
        });
    } else {
      // console.log(this.props.match);
      if (this.props.match.params && this.props.match.params.id) {
        fetchPost(this.props.match.params.id)
          .then((res) => {
            console.log(`fetchPost then `, res);

            if (!res) {
              return;
            }
            fetchCommentsByPostId(this.props.match.params.id)
              .then((res) => {
                console.log(`fetchCommentsByPostId then `, res);
              });
          })
          .catch((e) => {
            console.log(`fetchCommentsByPostId catch `, e);
          });
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {}

  render() {
    if (!this.props.post || !this.props.post.id) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div key={this.props.post.id} style={{padding: '10px'}}>
        <h2 style={{margin: '0px'}}>{this.props.post.title}</h2>
        <h3 style={{margin: '0px'}}>{this.props.post.body}</h3>

        {this.renderComments()}
      </div>
    );
  }

  renderComments = () => {
    if (!this.props.comments && !this.props.comments.length) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div>
        <p>Comments:</p>
        {this.props.comments.map((c, index) => this.renderComment(c, index))}
      </div>
    )
  };

  renderComment = (c, index) => {
    return (
      <div key={c.id} style={{padding: '10px'}}>
        <p style={{margin: '0px'}}>{c.email}</p>
        <p style={{margin: '0px'}}>{c.name}</p>
        <p style={{margin: '0px'}}>{c.body}</p>
      </div>
    )
  };

  componentWillUnmount() {
    removePostFromStore();
    removeCommentsFromStore();
  }
}

const mapStateToProps = state => ({
  post: state.posts.post,
  comments: state.comments.comments
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
