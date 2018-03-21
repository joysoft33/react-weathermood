import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';

import './Weather.css';

class Weather extends React.Component {
  render() {
    const { city, meteo, description, temperature, icon } = this.props;
    return (
      <div className="Weather">
        <img src={icon} alt="meteo" />
        <table>
          <tbody>
            <tr>
              <td>City</td>
              <td>{city}</td>
            </tr>
            <tr>
              <td>Meteo</td>
              <td>{meteo}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>Temperature</td>
              <td>{temperature} °C</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Weather.propTypes = {
  city: PropTypes.string.isRequired,
  meteo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    ...(state.weather)
  };
};

export default connect(mapStateToProps, actions)(Weather);
