import React, { Component } from 'react'

export class Book extends Component {
  state = {
    mouseIn: false
  }

  handleMouseEnter = () => {
    this.setState({mouseIn: true})
  }

  handleMouseLeave = () => {
    this.setState({mouseIn: false})
  }

  render() {
    const { title, author_name } = this.props
    const { mouseIn } = this.state
    return (
      <div className="book" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className="book-row">
          <p className="book-label">title</p>
          <p className="book-value">{title}</p>
        </div>
        <div className="book-row">
          <p className="book-label">author</p>
          <p className="book-value">{author_name}</p>
        </div>
        {mouseIn ? <div className="add-to-list">+ add to reading list</div> : null}
      </div>
    )
  }
}
