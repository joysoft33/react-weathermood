import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { trackPlay, trackPause, trackNext } from '../actions';

import './PlayCommands.css';

const PlayCommands = props => {
  const { playing, onPlayStart, onPlayPause, onPlayNext, onPlayStop } = props;
  return (
    <div className="PlayCommands">
      <button onClick={playing ? onPlayPause : onPlayStart}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={onPlayNext}>Next</button>
      <button onClick={onPlayStop}>Stop</button>
    </div>
  );
};

PlayCommands.propTypes = {
  onPlayStart: PropTypes.func.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onPlayNext: PropTypes.func.isRequired,
  onPlayStop: PropTypes.func.isRequired,
  playing: PropTypes.bool
};

const mapStateToProps = state => ({
  playing: state.tracks.playing
});

const mapDispatchToProps = dispatch => ({
  onPlayStart: () => dispatch(trackPlay()),
  onPlayPause: () => dispatch(trackPause()),
  onPlayNext: () => dispatch(trackNext())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayCommands);
