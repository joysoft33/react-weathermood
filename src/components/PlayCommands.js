import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { trackPause, trackPlay, trackNext } from '../actions';

import './PlayCommands.css';

const PlayCommands = ({ dispatch }) => {

  this.play = true;

  const onPlayToggle = evt => {
    evt.preventDefault();
    if (this.play) {
      dispatch(trackPause());
    } else {
      dispatch(trackPlay());
    }
  };

  const onPlayNext = evt => {
    evt.preventDefault();
    dispatch(trackNext());
  };

  const onPlayStop = evt => {
    evt.preventDefault();
  };

  return (
    <div className="PlayCommands">
      <button type="button" onClick={onPlayToggle}>Play</button>
      <button type="button" onClick={onPlayNext}>Next</button>
      <button type="button" onClick={onPlayStop}>Stop</button>
    </div>
  );
};

PlayCommands.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PlayCommands);
