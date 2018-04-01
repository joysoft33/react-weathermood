import { Actions } from '../actions';

const Weather = (state = {}, action) => {
  switch (action.type) {
    case Actions.WEATHER_SUCCESS:
      return { weather: action.weather };

    case Actions.WEATHER_ERROR:
      return {
        error: action.error.message
          ? action.error.message
          : action.error.statusText
      };

    default:
      return state;
  }
};

export default Weather;
