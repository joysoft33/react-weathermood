import * as weather from './weather';
import * as deezer from './deezer';

const api = {
  ...weather,
  ...deezer,
};

export default api;
