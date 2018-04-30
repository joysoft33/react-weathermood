import React from 'react';
import PropTypes from 'prop-types';

import './Track.css';

const Track = ({ title, artistName, albumTitle, current, play }) => {
  return (
    <div className={current ? 'Track active' : 'Track'} onClick={play}>
      <span>{artistName}</span>
      <span>{title}</span>
      <span>{albumTitle}</span>
    </div>
  );
};

Track.propTypes = {
  play: PropTypes.func.isRequired,
  current: PropTypes.bool,
  title: PropTypes.string,
  artistName: PropTypes.string,
  albumTitle: PropTypes.string
};

export default Track;
