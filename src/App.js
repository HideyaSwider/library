import React, { Component } from 'react'
import { Book } from './Book'
import './App.css'
const LIMIT = 6

class App extends Component {
  state = {
    search: 'lord of the rings',
    list: []
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
          this.setState({ list: json.docs })
        })
    }
  }

  render() {
    const { list } = this.state
    let books = list.map(book => {
      return <Book {...book} key={book.key} />
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
        {list.length > 0 ? (
          <div className="books">
            <div className="seach-results">
              <p>SEARCH RESULTS</p>
            </div>
            {books}
          </div>
        ) : null}
      </div>
    )
  }
}

export default App
