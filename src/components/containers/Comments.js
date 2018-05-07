import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'

import superagent from 'superagent'

class Comments extends Component {

  constructor() {
    super()
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    superagent
      .get('/api/comment')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err) {
          alert('ERROR: ' + err)
          return
        }
        let results = response.body.results

        this.setState({
          list: results
        })
      })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    var d = new Date()

    const comment = {
      username: this.state.username,
      body: this.state.body,
      timestamp:  d.getHours() + ":" + d.getMinutes()
    }

    let newListArray = Object.assign([], this.state.list)
    newListArray.push(comment)
    this.setState({
      list: newListArray
    })

    console.log(JSON.stringify(comment))
  }


  render() {
    const commentList = this.state.list.map((comment, i) => {
      return (
        <li key={i}><Comment  currentComment={comment}/></li>
      )
    });
    const style = styles.comment
    return(
      <div>
        <h2>Comments: Zone1</h2>
        <div style={style.commentsBox}>
          <ul style={style.commentsList}>
            { commentList }
          </ul>

          <form onSubmit={this.onSubmit.bind(this)}>
            <input className="form-control" onChange={this.onChange.bind(this)} type="text" name="username" placeholder="username" /><br />
            <input className="form-control" onChange={this.onChange.bind(this)} type="text" name="body" placeholder="Comment" /><br />
            <button className="btn btn-info">Submit Comment</button>
          </form>


        </div>
      </div>
    )
  }
}

export default Comments
