import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import api from '../api';
import PlayCommands from './PlayCommands';
import { getTracks, changeTrack } from '../actions';

import './Tracks.css';

class Tracks extends React.Component {
  componentWillMount() {
    this.subscription = api.Deezer.$events.subscribe(this.notifications);
    this.props.getTracks(this.props.playlistId);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  notifications = event => {
    this.props.notify(event);
  };

  play = (index) => {
    this.props.play(this.props.playlistId, index);
  };

  stop = () => {
    this.props.stop();
  };

  render() {
    const { tracks, current } = this.props;
    return (
      <div className="Tracks">
        <PlayCommands onPlayStop={this.stop} />
        <table>
          <tbody>
            {tracks.map((item, index) => (
              <tr key={item.id} className={index === current ? 'active' : ''} onClick={() => this.play(index)} >
                <td>{item.artistName}</td>
                <td>{item.title}</td>
                <td>{item.albumTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Tracks.propTypes = {
  play: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  getTracks: PropTypes.func.isRequired,
  playlistId: PropTypes.number.isRequired,
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

const mapStateToProps = (state, { match }) => {
  return {
    playlistId: +match.params.id,
    ...state.tracks
  };
};

const mapDispatchToProps = dispatch => ({
  play: (playlistId, trackId) => dispatch(changeTrack(playlistId, trackId)),
  stop: () => dispatch(push('/playlists')),
  getTracks: playlistId => dispatch(getTracks(playlistId)),
  notify: event => dispatch(event)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tracks));
