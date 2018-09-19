import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPosts: null 
    }

    componentDidMount() {
        console.log(this.props) 
        this.loadData() 
    }

    componentDidUpdate() {
        this.loadData() 
    }

    loadData = () => {
        if(this.props.match.params.id) {
            if(!this.state.loadedPosts || (this.state.loadedPosts && this.state.loadedPosts.id !== +this.props.match.params.id)) {
                axios.get(`/posts/${this.props.match.params.id}`)
                .then(res => this.setState({ loadedPosts: res.data }))
            }
        }
    }

    deletePostHanlder = () => {
        axios.delete(`/posts/${this.props.match.params.id}`)
        .then(res => console.log(res))
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>
        if(this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>
        }
        if(this.state.loadedPosts) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPosts.title}</h1>
                    <p>{this.state.loadedPosts.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHanlder} className="Delete">Delete</button>
                    </div>
                </div>
            );
        } 
        return post;
    }
}

export default FullPost;