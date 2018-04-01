import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getPlaylists } from '../actions';
import Playlist from './Playlist';

import './Playlists.css';

class Playlists extends React.Component {
  componentWillMount() {
    console.log('Playlists component will mount');
    this.props.getPlaylists(this.props.meteo);
  }

  componentWillReceiveProps(nextProps) {
    console.log('Playlists component props changed');
    if (nextProps.meteo !== this.props.meteo) {
      this.props.getPlaylists(nextProps.meteo);
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
  getPlaylists: PropTypes.func.isRequired,
  meteo: PropTypes.string,
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      tracksCount: PropTypes.number,
      pictureUrl: PropTypes.string
    })
  )
};

const mapStateToProps = (state, { match }) => ({
  meteo: match.params.meteo,
  ...state.playlists
});

const mapDispatchToProps = dispatch => ({
  getPlaylists: meteo => dispatch(getPlaylists(meteo))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Playlists)
);
