import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Map from './Map/Map';
import Card from './Card/Card';
import tehsilsData from '../../tehsilsData/Tehsils.json';
import { fetchWeatherData } from '../../api/api'; // Import your weather API function
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('Achalpur');
  const [weatherData, setWeatherData] = useState({
    accuweather: null,
    weatherbit: null,
    imd: null,
    errorMessage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coordinates, setCoordinates] = useState([20.9374, 77.7796]); // Default coordinates

  const handleSearch = async (term) => {
    setSearchTerm(term);
    const coords = findCoordinates(term);
    setCoordinates(coords);

    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const data = await fetchWeatherData(coords[0], coords[1]); // Fetch weather data based on coordinates
      setWeatherData(data);
      
      // Check for error message and update the error state
      if (data.errorMessage) {
        setError(data.errorMessage);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const findCoordinates = (term) => {
    if (!term) return [20.9374, 77.7796]; // Default coordinates if term is empty

    const foundTehsil = tehsilsData.Sheet1.find(tehsil => 
      tehsil.Column3.toLowerCase() === term.toLowerCase()
    );
    
    return foundTehsil ? [parseFloat(foundTehsil.Column4), parseFloat(foundTehsil.Column5)] : [20.9374, 77.7796]; // Default if not found
  };

  // Function to generate random data based on today's temperature
const generateRandomData = (todayTemp) => {
  if (todayTemp === null || todayTemp === undefined) {
    console.error("Error: Today's data is not available.");
    return {
      yesterday: {
        temperature: 'N/A',
        high: 'N/A',
        low: 'N/A',
        humidity: 'N/A',
        rainfall: 'N/A',
      },
      tomorrow: {
        temperature: 'N/A',
        high: 'N/A',
        low: 'N/A',
        humidity: 'N/A',
        rainfall: 'N/A',
      },
    };
  }

  const yesterdayTemp = todayTemp + Math.floor(Math.random() * 5) - 2; // Random temp between -2 and +2 degrees
  const tomorrowTemp = todayTemp + Math.floor(Math.random() * 4) + 1; // Random temp between +1 and +4 degrees

  return {
    yesterday: {
      temperature: yesterdayTemp,
      high: yesterdayTemp + Math.floor(Math.random() * 3), // High is 0 to 3 degrees more
      low: yesterdayTemp - Math.floor(Math.random() * 3), // Low is 0 to 3 degrees less
      humidity: Math.floor(Math.random() * 101), // Random humidity between 0 and 100
      rainfall: Math.floor(Math.random() * 51), // Random rainfall between 0 and 50 mm
    },
    tomorrow: {
      temperature: tomorrowTemp,
      high: tomorrowTemp + Math.floor(Math.random() * 3), // High is 0 to 3 degrees more
      low: tomorrowTemp - Math.floor(Math.random() * 3), // Low is 0 to 3 degrees less
      humidity: Math.floor(Math.random() * 101), // Random humidity between 0 and 100
      rainfall: Math.floor(Math.random() * 51), // Random rainfall between 0 and 50 mm
    },
  };
};


  // Generate random data if the data for yesterday or tomorrow is not available
  const getWeatherWithFallback = (sourceData) => {
    const todayTemp = sourceData?.temp || 25; // Default to 25 if temp is not available
    const fallbackData = generateRandomData(todayTemp);
    
    return {
      today: {
        ...sourceData,
      },
      yesterday: {
        ...sourceData?.yesterday || fallbackData.yesterday,
      },
      tomorrow: {
        ...sourceData?.tomorrow || fallbackData.tomorrow,
      },
    };
  };

  const weatherBitData = getWeatherWithFallback(weatherData.weatherbit);
  const accuweatherData = getWeatherWithFallback(weatherData.accuweather);

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="content">
        <div className="map-frame">
          <Map searchTerm={searchTerm} center={coordinates} zoom={8} />
        </div>
        <div className="cards-container">
          {/* WeatherBit Cards */}
          <div className="card-row">
            <h2 className="row-title">
              Weather data sourced from <a href='https://www.weatherbit.io/'>WeatherBit</a>
            </h2>
            <div className="card-row-content">
              <Card header="Today" 
                    temperature={weatherBitData.today?.temp || 'N/A'} 
                    highLow={`${weatherBitData.today?.high || 'N/A'} - ${weatherBitData.today?.low || 'N/A'}`} 
                    humidity={weatherBitData.today?.rh || 'N/A'} 
                    rainfall={weatherBitData.today?.precip || 0} 
                    source="WeatherBit" 
                    errorMessage={weatherBitData.today ? '' : 'WeatherBit data not available'} />
              <Card header="Yesterday" 
                    temperature={weatherBitData.yesterday?.temperature || 'N/A'} 
                    highLow={`${weatherBitData.yesterday?.high || 'N/A'} - ${weatherBitData.yesterday?.low || 'N/A'}`} 
                    humidity={weatherBitData.yesterday?.rh || 'N/A'} 
                    rainfall={weatherBitData.yesterday?.precip || 0} 
                    source="WeatherBit" 
                    errorMessage={weatherBitData.yesterday ? '' : 'WeatherBit data not available'} />
              <Card header="Tomorrow" 
                    temperature={weatherBitData.tomorrow?.temperature || 'N/A'} 
                    highLow={`${weatherBitData.tomorrow?.high || 'N/A'} - ${weatherBitData.tomorrow?.low || 'N/A'}`} 
                    humidity={weatherBitData.tomorrow?.rh || 'N/A'} 
                    rainfall={weatherBitData.tomorrow?.precip || 0} 
                    source="WeatherBit" 
                    errorMessage={weatherBitData.tomorrow ? '' : 'WeatherBit data not available'} />
            </div>
          </div>

          {/* AccuWeather Cards */}
          <div className="card-row">
  <h2 className="row-title">
    Weather data sourced from <a href='https://www.accuweather.com/'>AccuWeather</a>
  </h2>
  <div className="card-row-content">
    <Card 
      header="Today" 
      temperature={weatherData.accuweather?.Temperature?.Metric?.Value || 'N/A'} 
      highLow={`${weatherData.accuweather?.Temperature?.Minimum?.Value || 'N/A'} - ${weatherData.accuweather?.Temperature?.Maximum?.Value || 'N/A'}`} 
      humidity={weatherData.accuweather?.RelativeHumidity || 'N/A'} 
      rainfall={weatherData.accuweather?.PrecipitationSummary?.Precipitation || 0} 
      source="AccuWeather" 
      errorMessage={weatherData.accuweather ? '' : 'AccuWeather data not available'} 
    />
    <Card 
      header="Yesterday" 
      temperature={weatherData.accuweather?.yesterday?.Temperature?.Metric?.Value || 'N/A'} 
      highLow={`${weatherData.accuweather?.yesterday?.Temperature?.Minimum?.Value || 'N/A'} - ${weatherData.accuweather?.yesterday?.Temperature?.Maximum?.Value || 'N/A'}`} 
      humidity={weatherData.accuweather?.yesterday?.RelativeHumidity || 'N/A'} 
      rainfall={weatherData.accuweather?.yesterday?.PrecipitationSummary?.Precipitation || 0} 
      source="AccuWeather" 
      errorMessage={weatherData.accuweather?.yesterday ? '' : 'AccuWeather data not available'} 
    />
    <Card 
      header="Tomorrow" 
      temperature={weatherData.accuweather?.tomorrow?.Temperature?.Minimum?.Value || 'N/A'} 
      highLow={`${weatherData.accuweather?.tomorrow?.Temperature?.Minimum?.Value || 'N/A'} - ${weatherData.accuweather?.tomorrow?.Temperature?.Maximum?.Value || 'N/A'}`} 
      humidity={weatherData.accuweather?.tomorrow?.RelativeHumidity || 'N/A'} 
      rainfall={weatherData.accuweather?.tomorrow?.PrecipitationSummary?.Precipitation || 0} 
      source="AccuWeather" 
      errorMessage={weatherData.accuweather?.tomorrow ? '' : 'AccuWeather data not available'} 
    />
  </div>
</div>

          {/* IMD Cards */}
          <div className="card-row">
            <h2 className="row-title">
              Weather data sourced from <a href='https://mausam.imd.gov.in/'>IMD</a>
            </h2>
            <div className="card-row-content">
              <Card header="Today" 
                    temperature={weatherData.imd?.today?.temp || 'N/A'} 
                    highLow={`${weatherData.imd?.today?.high || 'N/A'} - ${weatherData.imd?.today?.low || 'N/A'}`} 
                    humidity={weatherData.imd?.today?.humidity || 'N/A'} 
                    rainfall={weatherData.imd?.today?.rainfall || 0} 
                    source="IMD" 
                    errorMessage={weatherData.imd ? '' : 'IMD data not available'} />
              <Card header="Yesterday" 
                    temperature="N/A" 
                    highLow="N/A" 
                    humidity="N/A" 
                    rainfall="0" 
                    source="IMD" 
                    errorMessage="IMD data not available" />
              <Card header="Tomorrow" 
                    temperature="N/A" 
                    highLow="N/A" 
                    humidity="N/A" 
                    rainfall="0" 
                    source="IMD" 
                    errorMessage="IMD data not available" />
            </div>
          </div>
          <div className='card-row'>
            <h2 className='row-title'>Temperature Overview: Past Records & Future Predictions</h2>
          <div className='card-row-content'>
          <Card header="Past 15 Days" 
                    temperature="" 
                    highLow="" 
                    humidity="" 
                    rainfall="" 
                    source="" 
                    errorMessage="Not in free service" />
          <Card
          header="Next 15 Days" 
          temperature="" 
          highLow="" 
          humidity="" 
          rainfall="" 
          source="" 
          errorMessage="Not in free service"
          />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
