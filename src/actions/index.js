import api from '../api';

export const actions = {
  WEATHER_SUCCESS: 'WEATHER_SUCCESS',
  WEATHER_ERROR: 'WEATHER_ERROR',
  PLAYLISTS_SUCCESS: 'PLAYLISTS_SUCCESS',
  PLAYLISTS_ERROR: 'PLAYLISTS_ERROR',
  TRACKS_SUCCESS: 'TRACKS_SUCCESS',
  TRACKS_ERROR: 'TRACKS_ERROR',
  TRACK_PLAY: 'TRACK_PLAY',
  TRACK_PAUSE: 'TRACK_PAUSE',
  TRACK_NEXT: 'TRACK_NEXT'
};

export const cityChange = city => dispatch =>
  api
    .getWeather(city)
    .then(weather => {
      dispatch({ type: actions.WEATHER_SUCCESS, weather });
    })
    .catch(result => {
      const error = result.message ? result.message : result.statusText;
      dispatch({ type: actions.WEATHER_ERROR, error });
    });

export const getPlaylists = key => dispatch =>
  api.getPlaylists(key, (error, playlists) => {
    if (playlists) {
      dispatch({ type: actions.PLAYLISTS_SUCCESS, playlists });
    } else {
      dispatch({ type: actions.PLAYLISTS_ERROR, error });
    }
  });

export const getTracks = id => dispatch =>
  api.getTracks(id, (error, tracks) => {
    if (tracks) {
      dispatch({ type: actions.TRACKS_SUCCESS, tracks });
    } else {
      dispatch({ type: actions.TRACKS_ERROR, error });
    }
  });

export const trackPlay = id => dispatch =>
  api.trackPlay(id, () => {
    dispatch({ type: actions.TRACK_PLAY });
  });

export const trackPause = id => dispatch =>
  api.trackPause(id, () => {
    dispatch({ type: actions.TRACK_PAUSE });
  });

export const trackNext = id => dispatch =>
  api.trackNext(id, () => {
    dispatch({ type: actions.TRACK_NEXT });
  });
