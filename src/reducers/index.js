import city from './city';
import weather from './weather';
import playlists from './playlists';
import tracks from './tracks';

export default {
  city,
  weather,
  playlists,
  tracks
};

export const getCity = state => ({
  ...state.city
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
