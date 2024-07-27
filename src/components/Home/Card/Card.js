import React from 'react';
import './Card.css'; // Import your card styles

const Card = ({ header, text, temperature, highLow, humidity, rainfall }) => {
    return (
        <div className="card">
            {header && <h3 className="card-header">{header}</h3>} {/* Display the header if provided */}
            {text && <p className="not-in-free-service-text">{text}</p>} {/* Display the text if provided */}
            {temperature !== undefined && <p>Temperature: {temperature}°C</p>}
            {highLow && <p>High-Low: {highLow}°C</p>}
            {humidity !== undefined && <p>Humidity: {humidity}%</p>}
            {rainfall !== undefined && <p>Rainfall: {rainfall}mm</p>}
        </div>
    );
};

export default Card;
