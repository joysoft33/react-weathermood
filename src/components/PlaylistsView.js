import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import { getPlaylists } from '../actions';

import Playlist from './Playlist';

import './PlaylistsView.css';

class PlaylistsView extends React.Component {
  componentWillMount() {
    console.log('PlaylistsView component will mount');
    this.props.getPlaylists(this.props.meteo);
  }

  componentWillReceiveProps(nextProps) {
    console.log('PlaylistsView component props changed');
    if (nextProps.meteo !== this.props.meteo) {
      this.props.getPlaylists(nextProps.meteo);
    }
  }

  select = (id) => {
    this.props.selectPlaylist(this.props.city, id);
  };

  render() {
    return (
      <div className="PlaylistsView">
        {this.props.playlists.map(item => (
          <Playlist
            key={item.id}
            playlist={item}
            select={this.select}
          />
        ))}
      </div>
    );
  }
}

PlaylistsView.propTypes = {
  selectPlaylist: PropTypes.func.isRequired,
  getPlaylists: PropTypes.func.isRequired,
  meteo: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      tracksCount: PropTypes.number,
      pictureUrl: PropTypes.string
    })
  )
};

const mapStateToProps = state => {
  const weather = state.weather.weather || {};
  return {
    meteo: weather.meteo,
    city: weather.city,
    ...state.playlists
  };
};

const mapDispatchToProps = dispatch => ({
  selectPlaylist: (city, id) => dispatch(push(`/${city}/playlists/${id}`)),
  getPlaylists: meteo => dispatch(getPlaylists(meteo))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistsView)
);
