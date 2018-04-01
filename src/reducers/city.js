import { Actions } from '../actions';

const City = (state = '', action) => {
  switch (action.type) {
    case Actions.CITY_CHANGED:
      return action.city;

    default:
      return state;
  }
};

export default City;
