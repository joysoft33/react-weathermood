import React from 'react';
import PropTypes from 'prop-types';

import './Playlist.css';

const Playlist = ({ playlist, select }) => {
  return (
    <div className="Playlist" onClick={() => select(playlist.id)}>
      <img src={playlist.pictureUrl} alt={playlist.id} />
      <div className="infos">
        <p>{playlist.title}</p>
        <p>{playlist.tracksCount} tracks</p>
      </div>
    </div>
  );
};

Playlist.propTypes = {
  select: PropTypes.func.isRequired,
  playlist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    tracksCount: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired
  })
};

export default Playlist;
