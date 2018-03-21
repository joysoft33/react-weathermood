import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { PlayCommands } from './PlayCommands';
import * as actions from '../actions';

import './Tracks.css';

class Tracks extends React.Component {
  render() {
    const { tracks } = this.props;
    return (
      <div>
        <PlayCommands />
        <table className="Playlist">
          <tbody>
            {tracks.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.artistName}</td>
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
  tracks: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    artistName: PropTypes.string,
    albumTitle: PropTypes.string
  }),
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    ...(state.tracks)
  };
};

export default withRouter(connect(mapStateToProps, actions)(Tracks));
