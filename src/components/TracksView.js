import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import api from '../api';
import { getTracks, changeTrack } from '../actions';

import PlayCommands from './PlayCommands';
import Track from './Track';

import './TracksView.css';

class TracksView extends React.Component {
  componentWillMount() {
    this.subscription = api.Deezer.$events.subscribe(this.notification);
    this.props.getTracks(this.props.playlistId);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  notification = event => {
    this.props.notify(event);
  };

  stop = () => {
    this.props.stop(this.props.city);
  };

  render() {
    const { tracks, current, playlistId, play } = this.props;
    return (
      <div className="TracksView">
        <PlayCommands onPlayStop={this.stop} />
        <div className="Tracks">
          {tracks.map((item, index) => (
            <Track
              key={item.key}
              play={() => play(playlistId, index)}
              current={index === current}
              {...item}
            />
          ))}
        </div>
      </div>
    );
  }
}

TracksView.propTypes = {
  play: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  getTracks: PropTypes.func.isRequired,
  playlistId: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  current: PropTypes.number,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      artistName: PropTypes.string,
      albumTitle: PropTypes.string
    })
  )
};

const mapStateToProps = (state, { match }) => ({
  playlistId: +match.params.id,
  city: match.params.city,
  ...state.tracks
});

const mapDispatchToProps = dispatch => ({
  play: (playlistId, index) => {
    return dispatch(changeTrack(playlistId, index));
  },
  stop: city => dispatch(push(`/${city}/playlists`)),
  getTracks: playlistId => dispatch(getTracks(playlistId)),
  notify: event => dispatch(event)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TracksView)
);
