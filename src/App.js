import React, { Component } from 'react'
import './App.css'

import { Route } from 'react-router-dom'

import MainPage from './components/pages/MainPage'
import SearchPage from './components/pages/SearchPage'


class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ MainPage } />
        <Route exact path="/search" component={ SearchPage } />
      
      </div>
    )
  }
}

export default BooksApp
