import { combineReducers } from 'redux';

import weather from './weather';
import playlists from './playlists';
import tracks from './tracks';
import track from './track';

export default combineReducers({
  weather,
  playlists,
  tracks,
  track
});

export const getWeather = state => ({
  ...state.weather
});

export const getPlaylists = state => ({
  ...state.playlists
});

export const getTracks = state => ({
  ...state.tracks
});
