import weather from './weather';
import playlists from './playlists';
import tracks from './tracks';

export default {
  weather,
  playlists,
  tracks
};

export const getWeather = state => ({
  ...state.weather
});

export const getPlaylists = state => ({
  ...state.playlists
});

export const getTracks = state => ({
  ...state.tracks
});
