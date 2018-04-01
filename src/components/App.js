import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Navbar from './Navbar';
import Weather from './Weather';
import Playlists from './Playlists';
import Tracks from './Tracks';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Weather />
        <Route exact path="/playlists/:meteo" component={Playlists} />
        <Route path="/tracks/:id" component={Tracks} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default withRouter(connect(mapStateToProps)(App));
