import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { cityChanged } from '../actions';

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
      </div>
    );
  }
}

CityInput.propTypes = {
  cityChanged: PropTypes.func.isRequired,
  city: PropTypes.string
};

const mapStateToProps = state => ({
  city: state.city
});

const mapDispatchToProps = dispatch => ({
  cityChanged: city => dispatch(cityChanged(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);
