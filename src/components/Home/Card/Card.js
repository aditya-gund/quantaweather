// src/components/Card/Card.js
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ header, temperature, highLow, humidity, rainfall, errorMessage }) => {
    return (
        <div className="card">
        <h3>{header}</h3>
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <>
            <p>Temperature: {temperature} °C</p>
            <p>High/Low: {highLow}°C</p>
            <p>Humidity: {humidity} %</p>
            <p>Rainfall: {rainfall} mm</p>
          </>
        )}
      </div>
    );
};

Card.propTypes = {
    header: PropTypes.string.isRequired,
    temperature: PropTypes.number,
    highLow: PropTypes.string,
    humidity: PropTypes.number,
    rainfall: PropTypes.number,
};

export default Card;
