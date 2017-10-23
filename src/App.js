import React, { Component } from 'react'
import { Book } from './Book'
import { BookPreview } from './BookPreview'
import './App.css'
import spin from './spin.svg'
const LIMIT = 9

class App extends Component {
  state = {
    search: 'lord of the rings',
    list: [],
    book: {},
    bookPreview: false,
    showSearch: true,
    showReadingList: false,
    isLoading: false,
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
      this.setState({isLoading: true})
      fetch(`http://openlibrary.org/search.json?q=${this.state.search.replace(/ /g, '+')}&limit=${LIMIT}`)
        .then(resp => resp.json())
        .then(json => {
          this.setState({ list: json.docs, bookPreview: false, book: {}, isLoading: false })
        })
    }
  }

  handleBookPreview = book => {
    this.setState({ bookPreview: true, book: book })
  }

  addOrRemoveFromReadingList = i => {
    let newList = Array.of(...this.state.list)
    newList[i].inReadingList = newList[i].inReadingList ? !newList[i].inReadingList : true
    this.setState({ list: newList })
    if (this.state.bookPreview && this.state.book.index === i) {
      this.setState({ book: newList[i] })
    }
  }

  showSearch = () => {
    this.setState({ showSearch: true, showReadingList: false })
  }

  showReadingList = () => {
    this.setState({ showSearch: false, showReadingList: true })
  }

  render() {
    const { list, bookPreview, book, showReadingList, showSearch, isLoading } = this.state
    let books = []
    if (showSearch) {
      books = list.map((book, i) => {
        book.index = i
        return <Book {...book} key={book.key} onClick={this.handleBookPreview} addOrRemoveFromReadingList={this.addOrRemoveFromReadingList} />
      })
    } else {
      books = list.filter(book => book.inReadingList === true).map((book, i) => {
        return <Book {...book} key={book.key} onClick={this.handleBookPreview} addOrRemoveFromReadingList={this.addOrRemoveFromReadingList} />
      })
    }

    return (
      <div className="app">
        <div className="buttons">
          <button onClick={this.showReadingList}>Show Reading List</button>
          <button onClick={this.showSearch}>Show Search</button>
        </div>
        {showSearch ? (
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
            {isLoading ? <img src={spin} className="loading" alt="loading" /> : null}
            {list.length > 0 && !bookPreview ? (
              <div className="books">
                <div className="seach-results">
                  <p>search results</p>
                </div>
                {books}
              </div>
            ) : null}
            {bookPreview ? <BookPreview {...book} addOrRemoveFromReadingList={this.addOrRemoveFromReadingList} /> : null}
          </div>
        ) : null}
        {showReadingList ? (
          <div className="app" style={{ justifyContent: 'flex-start' }}>
            <div className="books">
              <div className="seach-results" style={{ alignSelf: 'flex-start' }}>
                <p>My reading list</p>
              </div>
              {books}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default App
