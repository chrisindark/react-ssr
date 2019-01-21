import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {fetchPosts, storePostsAction} from './actions';
import Axios from 'axios';


class Home extends Component {
    componentDidMount() {
        const { posts } = this.props;

        console.log('posts', posts);
        // called only on client side.
        // Use this or other logical checks that
        // tell us if this data has not loaded already
        if (posts.length === 0) {
            fetchPosts();
            // this.getPosts();
        }
    }

    render() {
        const { posts } = this.props;

        return (
            <div>
                <h2 className="home">Home</h2>
                {posts.map(p => (
                    <p key={p.id}>{p.title}</p>
                ))}
            </div>
        )
    }

    async getPosts() {
        // If the API call is triggered on the server,
        // call the API server directly. When triggered from
        // browser, our proxy in package.json will handle the
        // request
        const isServer = typeof window === 'undefined';
        const url = isServer
            ? 'http://jsonplaceholder.typicode.com/posts'
            : 'http://jsonplaceholder.typicode.com/posts';

        console.log(`Getting posts on ${isServer ? 'server' : 'browser'}`);

        // get the data
        const res = await Axios.get(url);
        this.props.storePostsAction(res.data);
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
    posts: state.posts
});

// map api call which can be conditionally triggered
const mapDispatchToProps = dispatch => bindActionCreators({
    storePostsAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
