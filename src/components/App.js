import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PlaylistsView from './PlaylistsView';
import TracksView from './TracksView';
import Weather from './Weather';
import Navbar from './Navbar';

import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Route path="/:city" component={Weather} />
      <Switch>
        <Route exact path="/:city/playlists" component={PlaylistsView} />
        <Route path="/:city/playlists/:id" component={TracksView} />
      </Switch>
    </div>
  );
};

export default App;
