import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import './CityInput.css';

class CityInput extends React.Component {
  constructor(props) {
    super(props);
    this.city = props.city;
  }

  onSubmit = evt => {
    evt.preventDefault();
    if (this.city.value.trim()) {
      this.props.cityChanged(this.city.value);
      this.city.value = '';
    }
  };

  render() {
    return (
      <div className="CityInput">
        <form onSubmit={this.onSubmit}>
          <input ref={node => (this.city = node)} defaultValue={this.city} />
          <button type="submit">GO!</button>
        </form>
        {this.props.error && (<div className="Error">{this.props.error}</div>)}
      </div>
    );
  }
}

CityInput.propTypes = {
  cityChanged: PropTypes.func.isRequired,
  error: PropTypes.string,
  city: PropTypes.string
};

const mapStateToProps = state => ({
  error: state.weather.error,
  city: state.city
});

const mapDispatchToProps = dispatch => ({
  cityChanged: city => dispatch(push(`/${city}/playlists`))
});

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);
