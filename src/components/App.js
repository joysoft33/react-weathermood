import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Weather from './Weather';
import Playlists from './Playlists';
import Navbar from './Navbar';

import './App.css';

class App extends React.Component {
  render() {
    const { climate, error } = this.props;
    return (
      <div className="App">
        <Navbar />
        {climate && (
          <div className="container">
            <Weather />
            <Playlists climate={climate} />
          </div>
        )}
        {error && (
          <div className="Error">{error}</div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  climate: PropTypes.string,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    climate: state.weather.meteo,
    error: state.weather.error
  };
};

export default connect(mapStateToProps)(App);
