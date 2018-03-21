import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTracks } from '../actions';

import './Playlist.css';

const Playlist = ({ playlist, onClickPlaylist }) => {
  return (
    <div className="Playlist" onClick={() => onClickPlaylist(playlist.id)}>
      <img src={playlist.pictureUrl} alt={playlist.id} />
      <div className="infos">
        <p>{playlist.title}</p>
        <p>{playlist.tracksCount} tracks</p>
      </div>
    </div>
  );
};

Playlist.propTypes = {
  onClickPlaylist: PropTypes.func.isRequired,
  playlist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    tracksCount: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onClickPlaylist: id => {
    dispatch(getTracks(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
