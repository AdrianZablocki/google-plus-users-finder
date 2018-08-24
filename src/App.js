import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from './components/User/User';
import SearchBar from './components/SearchBar/SearchBar';
import Spinner from './components/UI/Spiner/Spinner';
import * as actions from './store/actions/index';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onFetchUsers(this.props.value, this.props.limit);
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onFetchUsers(this.props.value, this.props.limit);
  }

  render() {
    let users = <p>something went wrong</p>
    if(!this.props.error) {
      users = this.props.filteredUsers.map(user => {
        return <User 
                  key={user.id}
                  imgSrc={user.image.url}
                  name={user.displayName}
                  link={user.url} />
      })
    }

    if(this.props.loading) {
      users = <Spinner/>
    }

    return (
      <div className="App">
        <SearchBar submited={this.submitHandler} changed={this.props.onInputHandler} />

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
          {users}
        </div>

      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    users: state.users.users,
    filteredUsers: state.users.filteredUsers,
    value: state.users.value,
    limit: state.users.limit,
    error: state.users.error,
    loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: (id, limit) => dispatch(actions.fetchUsers(id, limit)),
    onInputHandler: (event) => dispatch(actions.inputHandler(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);