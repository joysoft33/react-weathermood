import { actions } from '../actions';

const initialState = {
  playing: false
};

const Track = (state = initialState, action) => {
  switch (action.type) {
    case actions.TRACK_PLAY:
      return { playing: true };

    case actions.TRACK_PAUSE:
      return { playing: false };

    case actions.TRACK_NEXT:
      return { playing: false };

    default:
      return state;
  }
};

export default Track;
