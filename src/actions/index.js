import { push } from 'react-router-redux';
import 'rxjs/add/operator/first';

import api from '../api';

export const Actions = {
  CITY_CHANGED: 'CITY_CHANGED',
  WEATHER_SUCCESS: 'WEATHER_SUCCESS',
  WEATHER_ERROR: 'WEATHER_ERROR',
  PLAYLISTS_SUCCESS: 'PLAYLISTS_SUCCESS',
  PLAYLISTS_ERROR: 'PLAYLISTS_ERROR',
  TRACKS_SUCCESS: 'TRACKS_SUCCESS',
  TRACKS_ERROR: 'TRACKS_ERROR',
  TRACKS_CURRENT: 'TRACKS_CURRENT',
  TRACKS_PLAY: 'TRACKS_PLAY',
  TRACKS_PAUSE: 'TRACKS_PAUSE',
  TRACKS_NEXT: 'TRACKS_NEXT'
};

export const cityChanged = city => dispatch =>
  dispatch({ type: Actions.CITY_CHANGED, city });

export const getWeather = city => dispatch =>
  api.Weather.getWeather(city)
    .then(weather => {
      dispatch({ type: Actions.WEATHER_SUCCESS, weather });
      dispatch(push(`/playlists/${weather.meteo}`));
    })
    .catch(error => dispatch({ type: Actions.WEATHER_ERROR, error }));

export const getPlaylists = key => dispatch =>
  api.Deezer.getPlaylists(key)
    .first()
    .subscribe(
      playlists => dispatch({ type: Actions.PLAYLISTS_SUCCESS, playlists }),
      error => dispatch({ type: Actions.PLAYLISTS_ERROR, error })
    );

export const getTracks = id => dispatch =>
  api.Deezer.playPlaylist(id)
    .first()
    .subscribe(
      tracks => dispatch({ type: Actions.TRACKS_SUCCESS, tracks }),
      error => dispatch({ type: Actions.TRACKS_ERROR, error })
    );

export const changeTrack = (id, index) => dispatch =>
  api.Deezer.playPlaylist(id, index)
    .first()
    .subscribe(
      () => dispatch({ type: Actions.TRACKS_PLAY }),
      error => dispatch({ type: Actions.TRACKS_ERROR, error })
    );

export const trackPlay = () => dispatch => {
  api.Deezer.trackPlay();
  dispatch({ type: Actions.TRACKS_PLAY });
};

export const trackPause = () => dispatch => {
  api.Deezer.trackPause();
  dispatch({ type: Actions.TRACKS_PAUSE });
};

export const trackNext = () => dispatch => {
  api.Deezer.trackNext();
  dispatch({ type: Actions.TRACKS_NEXT });
};
