import React, { Component } from 'react'
import styles from './styles'

class Comment extends Component {
  render() {
    const style = styles.comment
    return(
      <div>
        <p style={style.commentBody}>
          {this.props.currentComment.body}
        </p>
        <span style={style.commentWeight}>{this.props.currentComment.username}</span>
        <span style={style.seprator}>|</span>
        <span style={style.commentWeight}>{this.props.currentComment.timestamp}</span>
        <hr />
      </div>
    )
  }
}

export default Comment
