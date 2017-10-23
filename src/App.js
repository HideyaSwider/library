import React, { Component } from 'react'
import { Book } from './Book'
import { BookPreview } from './BookPreview'
import './App.css'
const LIMIT = 9

class App extends Component {
  state = {
    search: 'lord of the rings',
    list: [],
    book: {},
    bookPreview: false
  }

  handleInputChange = ({ target }) => {
    if (this.list !== []) {
      this.setState({ search: target.value, list: [] })
    } else {
      this.setState({ search: target.value })
    }
  }

  handleSearch = e => {
    if (e.keyCode === 13) {
      fetch(`http://openlibrary.org/search.json?q=${this.state.search.replace(/ /g, '+')}&limit=${LIMIT}`)
        .then(resp => resp.json())
        .then(json => {
          this.setState({ list: json.docs, bookPreview: false, book: {} })
        })
    }
  }

  handleBookPreview = book => {
    this.setState({ bookPreview: true, book: book })
  }

  render() {
    const { list, bookPreview, book } = this.state
    let books = list.map(book => {
      return <Book {...book} key={book.key} onClick={this.handleBookPreview} />
    })
    return (
      <div className="app">
        <input
          className="search"
          defaultValue="lord of the rings"
          type="text"
          onKeyUp={this.handleSearch}
          value={this.state.value}
          onChange={this.handleInputChange}
          placeholder="Search books..."
        />
        {list.length > 0 && !bookPreview ? (
          <div className="books">
            <div className="seach-results">
              <p>SEARCH RESULTS</p>
            </div>
            {books}
          </div>
        ) : null}
        {bookPreview ? <BookPreview {...book} /> : null}
      </div>
    )
  }
}

export default App
