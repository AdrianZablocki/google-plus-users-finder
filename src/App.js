import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from './components/User/User';
import SearchBar from './components/SearchBar/SearchBar';
import Spinner from './components/UI/Spiner/Spinner';
import CountUsers from './components/CountUsers/CountUsers';
import * as actions from './store/actions/index';

import './App.css';

class App extends Component {
  state = {
    countConfig: [50, 40, 30, 20, 10]
  }

  componentDidMount() {
    this.props.onFetchUsers(this.props.value);
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onFetchUsers(this.props.value);
  }

  render() {
    let users = <p>something went wrong</p>;
    if(!this.props.error) {
      users = this.props.filteredUsers.map(user => {
        return <User 
                  key={user.id}
                  imgSrc={user.image.url}
                  name={user.displayName}
                  link={user.url}
                  id={user.id} />
      })
    }

    if(this.props.loading) {
      users = <Spinner/>
    }

    return (
      <div className="App">
        <SearchBar submited={this.submitHandler} changed={this.props.onInputHandler} />

        <div className="Filters">
          <CountUsers countOptions={this.state.countConfig} count={this.props.onCountHandler} />

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
    error: state.users.error,
    loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: (id) => dispatch(actions.fetchUsers(id)),
    onInputHandler: (event) => dispatch(actions.inputHandler(event)),
    onCountHandler: (event) => dispatch(actions.countHandler(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);