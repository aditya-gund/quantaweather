import React from 'react';
import './Card.css';
import SourceMessage from '../../SourceMessage/SourceMessage';

const Card = ({ header, text, temperature, highLow, humidity, rainfall, source }) => {
    return (
        <div className="card">
            {header && <h3 className="card-header">{header}</h3>}
            {text && <p className="not-in-free-service-text">{text}</p>}
            {temperature !== undefined && <p>Temperature: {temperature}°C</p>}
            {highLow && <p>High-Low: {highLow}°C</p>}
            {humidity !== undefined && <p>Humidity: {humidity}%</p>}
            {rainfall !== undefined && <p>Rainfall: {rainfall}mm</p>}
            {source && <SourceMessage source={source} />}
        </div>
    );
};

export default Card;
