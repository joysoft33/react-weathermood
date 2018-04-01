import { Actions } from '../actions';

const initialState = {
  playing: false,
  current: 0,
  tracks: []
};

const Tracks = (state = initialState, action) => {
  switch (action.type) {
    case Actions.TRACKS_SUCCESS:
      return {
        ...state,
        error: undefined,
        tracks: action.tracks
      };

    case Actions.TRACKS_ERROR:
      return {
        ...state,
        tracks: [],
        error: action.error
      };

    case Actions.TRACKS_CURRENT:
      return {
        ...state,
        current: action.current
      };

    case Actions.TRACKS_PLAY:
      return {
        ...state,
        playing: true
      };

    case Actions.TRACKS_PAUSE:
      return {
        ...state,
        playing: false
      };

    case Actions.TRACKS_NEXT:
      return {
        ...state,
        playing: false
      };

    default:
      return state;
  }
};

export default Tracks;
