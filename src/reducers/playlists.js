import { Actions } from '../actions';

const initialState = {
  playlists: []
};

const Playlists = (state = initialState, action) => {
  switch (action.type) {
    case Actions.PLAYLISTS_SUCCESS:
      return { playlists: action.playlists };

    case Actions.PLAYLISTS_ERROR:
      return { error: action.error };

    default:
      return state;
  }
};

export default Playlists;
