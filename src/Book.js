import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import noCover from './icons/no-cover-image.png'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, books, changeShelf } = this.props

    // adds fallbacks for missing covers and titles
    const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover
    const title = book.title ? book.title : "Not available"

    return (
          <li>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{ backgroundImage: `url(${coverImg})`}}>
                </div>
                <Shelf
                  book={ book }
                  books={ books }
                  changeShelf={changeShelf }
                />
              </div>
              <div className="book-title">{ title }</div>
              { /* Checks for authors and renders each on separate lines*/
                book.authors && book.authors.map((author, index) => (
                  <div className="book-authors" key={index}>{author}</div>
              ))}
            </div>
          </li>
    )
  }

}

export default Book
