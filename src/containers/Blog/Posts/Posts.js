import React, { Component } from 'react'
import axios from '../../../axios'
import { Route } from 'react-router-dom'

import FullPost from '../FullPost/FullPost'
import Post from '../../../components/Post/Post'
import './Posts.css'

export default class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('/posts')
    .then(res => {
        const posts = res.data.slice(0, 4) 
        const updatedPosts = posts.map(post => {
            return {
                ...post, 
                author: 'Max' 
            }
        })
        this.setState({ posts: updatedPosts }) 
    })
    .catch(err => console.log(err))
  }

  postSelectedHandler = (id) => {
    // this.props.history.push({pathname: '/posts/' + id})
    this.props.history.push('/posts/' + id)
  }

  render() {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
    if(!this.state.error) {
        posts = this.state.posts.map(post => (
            // <Link to={'/posts' + post.id} key={post.id}>
              <Post 
                key={post.id}
                author={post.author} 
                title={post.title} 
                clicked={() => this.postSelectedHandler(post.id)}
            />
            // </Link>
        ))
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    )
  }
}
