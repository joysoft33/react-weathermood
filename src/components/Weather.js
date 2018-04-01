import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getWeather } from '../actions';

import './Weather.css';

class Weather extends React.Component {

  componentWillReceiveProps(nextProps) {
    console.log('Weather component props changed');
    if (nextProps.city !== this.props.city) {
      this.props.getWeather(nextProps.city);
    }
  }

  render() {
    const { weather, error } = this.props;
    return weather ? (
      <div className="Weather">
        <img src={weather.icon} alt="meteo" />
        <table>
          <tbody>
            <tr>
              <td>City</td>
              <td>{weather.city}</td>
            </tr>
            <tr>
              <td>Meteo</td>
              <td>{weather.meteo}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{weather.description}</td>
            </tr>
            <tr>
              <td>Temperature</td>
              <td>{weather.temperature} °C</td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : error ? (
      <div className="Error">{error}</div>
    ) : (
      <div />
    );
  }
}

Weather.propTypes = {
  getWeather: PropTypes.func.isRequired,
  city: PropTypes.string,
  error: PropTypes.string,
  weather: PropTypes.shape({
    city: PropTypes.string,
    meteo: PropTypes.string,
    description: PropTypes.string,
    temperature: PropTypes.number,
    icon: PropTypes.string
  })
};

const mapStateToProps = state => ({
  city: state.city,
  error: state.weather.error,
  weather: state.weather.weather
});

const mapDispatchToProps = dispatch => ({
  getWeather: city => dispatch(getWeather(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
