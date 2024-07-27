import React from 'react';
import './SourceMessage.css';

const SourceMessage = ({ source }) => {
  let sourceText;
  sourceText = "Weather data sourced from AccuWeather,OpeanWeather and IMD"
//   switch (source) {
//     case 'AccuWeather':
//       sourceText = "Weather data sourced from AccuWeather.";
//       break;
//     case 'OpenWeather':
//       sourceText = "Weather data sourced from OpenWeather.";
//       break;
//     case 'IMD':
//       sourceText = "Weather data sourced from IMD.";
//       break;
//     default:
//       sourceText = "Weather data sourced from an unknown source.";
//   }

  return (
    <div className="source-message">
      {sourceText} <a href="https://www.accuweather.com/" target="_blank" rel="noopener noreferrer"></a>
    </div>
  );
};

export default SourceMessage;
