import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { cityChange } from '../actions';

import './CityInput.css';

const CityInput = ({ dispatch }) => {
  let input;

  const onSubmit = e => {
    e.preventDefault();
    if (input.value.trim()) {
      dispatch(cityChange(input.value));
      input.value = '';
    }
  };

  return (
    <div className="CityInput">
      <form onSubmit={onSubmit}>
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">GO!</button>
      </form>
    </div>
  );
};

CityInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(CityInput);
