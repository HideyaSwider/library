import React, { Component } from 'react'

export class Book extends Component {
  state = {
    mouseIn: false
  }

  handleMouseEnter = () => {
    this.setState({ mouseIn: true })
  }

  handleMouseLeave = () => {
    this.setState({ mouseIn: false })
  }

  render() {
    const { title, author_name, inReadingList, addOrRemoveFromReadingList, index} = this.props
    const { mouseIn } = this.state
    return (
      <div style={{position: 'relative'}} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
      <div className="book" onClick={() => this.props.onClick(this.props)} >
        <div className="book-row">
          <p className="book-label">title</p>
          <p className="book-value">{title}</p>
        </div>
        <div className="book-row">
          <p className="book-label">author</p>
          <p className="book-value">{author_name}</p>
        </div>
      </div>
      {mouseIn ? (
          <div
            className="add-to-list"
            onClick={e => {
              addOrRemoveFromReadingList(index)
            }}
          >
            {inReadingList ? '- remove from reading list' : '+ add to reading list'}
          </div>
        ) : null}
      </div>
    )
  }
}
