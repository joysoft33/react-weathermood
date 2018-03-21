import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPlaylists } from '../actions';
import Playlist from './Playlist';

import './Playlists.css';

class Playlists extends React.Component {
  componentWillMount() {
    this.props.getPlaylists(this.props.climate);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.climate !== this.props.climate) {
      this.props.getPlaylists(nextProps.climate);
    }
  }

  render() {
    const { playlists } = this.props;
    return (
      <div className="Playlists">
        {playlists.map(playlist => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </div>
    );
  }
}

Playlists.propTypes = {
  climate: PropTypes.string.isRequired,
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      tracksCount: PropTypes.number,
      pictureUrl: PropTypes.string
    })
  ),
  error: PropTypes.string,
  getPlaylists: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    ...(state.playlists)
  };
};

const mapDispatchToProps = dispatch => ({
  getPlaylists: climate => {
    dispatch(getPlaylists(climate));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
