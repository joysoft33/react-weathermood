import { actions } from '../actions';

const initialState = {
  playlists: []
};

const Playlists = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLAYLISTS_SUCCESS:
      return { playlists: action.playlists };

    case actions.PLAYLISTS_ERROR:
      return { error: action.error };

    default:
      return state;
  }
};

export default Playlists;
