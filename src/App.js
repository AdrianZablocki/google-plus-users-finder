import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from './components/User/User';
import SearchBar from './components/SearchBar/SearchBar';
import Spinner from './components/UI/Spiner/Spinner';
import CountUsers from './components/CountUsers/CountUsers';
import SortUsers from './components/SortUsers/SortUsers';
import * as actions from './store/actions/index';

import classes from './App.css';

class App extends Component {
  state = {
    countConfig: [50, 40, 30, 20, 10],
    sortConfig: ['All', 'Name', 'Favorites']
  }

  componentDidMount() {
    this.props.onFetchUsers(this.props.value);
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onFetchUsers(this.props.value);
  }

  render() {
    console.log(this.props.favorites);
    let users = <p>something went wrong</p>;
    if(!this.props.error) {
      users = this.props.filteredUsers.map(user => {
        return <User 
                  key={user.id}
                  imgSrc={user.image.url}
                  name={user.displayName}
                  link={user.url}
                  id={user.id}
                  changed={this.props.onAddToFavorites}
                   />
      })
    }

    if(this.props.loading) {
      users = <Spinner/>
    }

    return (
      <div className={classes.App}>
        <SearchBar submited={this.submitHandler} changed={this.props.onInputHandler} />
        <div className={classes.Filters}>
          <CountUsers countOptions={this.state.countConfig} count={this.props.onCountHandler} />
          <SortUsers sortOptions={this.state.sortConfig} sort={this.props.onSortHandler}/>
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
    favorites: state.users.favoritesUsers,
    value: state.users.value,
    error: state.users.error,
    loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: (id) => dispatch(actions.fetchUsers(id)),
    onInputHandler: (event) => dispatch(actions.inputHandler(event)),
    onCountHandler: (event) => dispatch(actions.countHandler(event)),
    onSortHandler: (event) => dispatch(actions.sortHandler(event)),
    onAddToFavorites: (event) => dispatch(actions.favoritesHandler(event)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);