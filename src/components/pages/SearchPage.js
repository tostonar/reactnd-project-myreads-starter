import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../../BooksAPI'

import Book from '../Book'

class SearchPage extends Component {
  state = {
    books: [],
    results: [],
    query: ""
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      this.setState({ books: resp })
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query }, this.submitSearch);
  }

  submitSearch() {
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    
    BooksAPI.search(this.state.query.trim()).then(res => {

      if(res.error) {
       /*clear results list*/
       return this.setState({ results: [] });
      } /* sets results to that list*/
      else {
        res.forEach(b => {
          let f = this.state.books.filter(B => B.id === b.id);

          if(f[0]){
            b.shelf = f[0].shelf;
          }
        });
        return this.setState({ results: res });
      }
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map((book, key) => <Book updateBook={this.updateBook} book={book} key={key} />)
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
