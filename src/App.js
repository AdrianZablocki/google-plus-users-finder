import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onFetchUsers('adrian')
  }
  render() {
    console.log()
    return (
      <div className="App">
        <div className="Container">

          <div className="Input">
            <input type="text" placeholder="Who are you looking for?" />
            <input type="submit" value="Search" />
          </div>

          <div className="Filters">

            <div className="Count">
              <label>Number of results:</label>
              <select name="CountResults">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="Sort">
              <label>Sort by:</label>
              <select name="SelectBy">
                <option value="Name">Name</option>
                <option value="LastName">Last Name</option>
                <option value="Favorites">Favorites</option>
              </select>
            </div>

          </div>

          <div className="List">

            <div className="User">
              <img src="//lh6.googleusercontent.com/-9WVYyQ3YZ70/AAAAAAAAAAI/AAAAAAAALgI/up3_zQ0muIg/photo.jpg?sz=50" alt="avatar" title="Adrian Grenier" />
              <h2>Adrian Grenier</h2>
              <a href="https://plus.google.com/106749254706410187997">User profile</a>
            </div>

          </div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    users: state.users.posts,
    filteredusers: state.users.filteredPosts,
    error: state.users.error,
    loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: (id) => dispatch(actions.fetchUsers(id)),
    onFilterHandler: (event) => dispatch(actions.inputHandler(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
