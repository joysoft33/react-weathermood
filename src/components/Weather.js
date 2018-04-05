import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getWeather } from '../actions';

import './Weather.css';

class Weather extends React.Component {
  componentDidMount() {
    this.props.getWeather(this.props.city);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.props.city) {
      this.props.getWeather(nextProps.city);
    }
  }

  render() {
    const { weather } = this.props;
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
    ) : (
      <div>Meteo unknown</div>
    );
  }
}

Weather.propTypes = {
  getWeather: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  weather: PropTypes.shape({
    city: PropTypes.string,
    meteo: PropTypes.string,
    description: PropTypes.string,
    temperature: PropTypes.number,
    icon: PropTypes.string
  })
};

const mapStateToProps = (state, { match }) => ({
  city: match.params.city,
  ...state.weather
});

const mapDispatchToProps = dispatch => ({
  getWeather: city => dispatch(getWeather(city))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Weather)
);
