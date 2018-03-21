import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTracks } from '../actions';

import './Playlist.css';

const Playlist = ({ playlist, onPlaylistClicked }) => {
  return (
    <div className="Playlist" onClick={() => onPlaylistClicked(playlist.id)}>
      <img src={playlist.pictureUrl} alt={playlist.id} />
      <div className="infos">
        <p>{playlist.title}</p>
        <p>{playlist.tracksCount} tracks</p>
      </div>
    </div>
  );
};

Playlist.propTypes = {
  onPlaylistClicked: PropTypes.func.isRequired,
  playlist: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    tracksCount: PropTypes.number,
    pictureUrl: PropTypes.string
  })
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onPlaylistClicked: id => {
    dispatch(getTracks(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
