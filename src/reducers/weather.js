import { actions } from '../actions';

const initialState = {};

const Weather = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEATHER_SUCCESS:
      return {
        ...action.weather,
        error: ''
      };

    case actions.WEATHER_ERROR:
      return {
        error: action.error
      };

    default:
      return state;
  }
};

export default Weather;
