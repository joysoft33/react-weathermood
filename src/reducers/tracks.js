import { actions } from '../actions';

const initialState = {
  tracks: [],
  error: ''
};

const Tracks = (state = initialState, action) => {
  switch (action.type) {
    case actions.TRACKS_SUCCESS:
      return { tracks: action.tracks };

    case actions.TRACKS_ERROR:
      return { error: action.error };

    default:
      return state;
  }
};

export default Tracks;
