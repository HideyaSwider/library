import React, { Component } from 'react'

export class BookPreview extends Component {
  render() {
    const {
      title,
      author_name,
      oclc,
      first_publish_year,
      publisher,
      id_goodreads,
      isbn,
      preview,
      inReadingList,
      addOrRemoveFromReadingList,
      index
    } = this.props
    console.log("============================================")
    console.log(inReadingList)
    console.log("============================================")
    return (
      <div className="book-preview">
        <div className="book-title">
          <p>{title}</p>
        </div>
        <div className="book-content">
          <div>
            <div className="book-row">
              <p className="book-label">title</p>
              <p className="book-value">{title}</p>
            </div>
            <div className="book-row">
              <p className="book-label">author</p>
              <p className="book-value">{author_name}</p>
            </div>
            <div className="book-row">
              <p className="book-label">published</p>
              <p className="book-value">{first_publish_year}</p>
            </div>
            <div className="book-row">
              <p className="book-label">isbn</p>
              <p className="book-value">{isbn ? isbn[isbn.length - 1] : null}</p>
            </div>
            <div className="book-row">
              <p className="book-label">publisher</p>
              <p className="book-value">{title}</p>
            </div>
            <div className="book-row">
              <p className="book-label">author</p>
              <p className="book-value">{publisher ? publisher[publisher.length - 1] : null}</p>
            </div>
            <div className="book-row">
              <p className="book-label">oclc</p>
              <p className="book-value">{oclc ? oclc[0] : null}</p>
            </div>
            <div className="book-row">
              <p className="book-label">goodreads id</p>
              <p className="book-value">{id_goodreads ? id_goodreads[0] : null}</p>
            </div>
          </div>
          <div className="book-cover-preview">{preview ? <img alt={title} src={preview} /> : <p>no preview available</p>}</div>
        </div>
        <div className="add-to-list-panel">
          <div className="add-to-list" onClick={() => addOrRemoveFromReadingList(index)}>
            {inReadingList ? '- remove from reading list' : '+ add to reading list'}
          </div>{' '}
        </div>
      </div>
    )
  }
}
