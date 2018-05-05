import React, { Component } from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../actions';
import './App.css';

class App extends Component {
  constructor() {
    super();
    if(!localStorage.getItem('saldo')) {
      localStorage.setItem('saldo', 10000000);
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
    setInterval(function() {
      dispatch(fetchPostsIfNeeded());
    }, 300000);
  }

  render() {
    const { dataCrypto } = this.props;
    return (
      <div>
        <Table data={dataCrypto} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { dataCrypto } = state

  return {
    dataCrypto
  }
}

export default connect(mapStateToProps)(App);
