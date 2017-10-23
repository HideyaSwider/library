import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    search: ''
  }

  handleInputChange = ({ target }) => {
    this.setState({ search: target.value })
  }

  handleSearch = e => {
    if (e.keyCode === 13) {
      fetch(`http://openlibrary.org/search.json?q=${this.state.search}`)
        .then(resp => resp.json())
        .then(json => {
          //do something with json
        })
    }
  }

  render() {
    return (
      <div className="app">
        <input
          className='search'
          type="text"
          onKeyUp={this.handleSearch}
          value={this.state.value}
          onChange={this.handleInputChange}
          placeholder="Search books..."
        />
      </div>
    )
  }
}

export default App
