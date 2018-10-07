import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    fetchedBooks: [],
    searchErr: false
  }

  getBooks = (event) => {

    const query = event.target.value.trim()
    this.setState({ query: query })

    // if user input => run the search
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        books.length > 0 ?  this.setState({fetchedBooks: books, searchErr: false }) : this.setState({ fetchedBooks: [], searchErr: true })
      })

    // if query is empty => reset state to default
  } else this.setState({fetchedBooks: [], searchErr: false })
  }

  render() {

    const { query, fetchedBooks, searchErr } = this.state
    const { books, changeShelf } = this.props

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={ query }
                onChange={ this.getBooks } />
            </div>
          </div>
          <div className="search-books-results">
            { fetchedBooks.length > 0 && (
              <div>
                <div className=''>
                  <h3>Search returned { fetchedBooks.length } books </h3>
                </div>
                <ol className="books-grid">
                  {fetchedBooks.map((book) => (
                    <Book
                      book={ book }
                      books={ books }
                      key={ book.id }
                      changeShelf={ changeShelf }
                    />
                  ))}
                </ol>
              </div>
            )}
            { searchErr  && (
              <div>
                <div className=''>
                  <h3>Found 0 books.  Search again!</h3>
                  </div>
                </div>
            )}
          </div>
        </div>
      )}
}
export default Search
