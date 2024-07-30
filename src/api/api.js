const API_KEY_WEATHERBIT = '8437d4bb57774323815addc7f86854e4';
const API_KEY_ACCUWEATHER = 'pjKOAqIytv3qMxV3MvmmoC8I7o0HwEM6';
const API_KEY_IMD = 'YOUR_IMD_API_KEY';

// Function to fetch weather data from all three sources
export const fetchWeatherData = async (latitude, longitude) => {
  const weatherData = {
    accuweather: null,
    weatherbit: null,
    imd: null,
    errorMessage: ''
  };

  // Fetch WeatherBit data
  try {
    const weatherBitResponse = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY_WEATHERBIT}`);
    if (!weatherBitResponse.ok) throw new Error(`WeatherBit data not available: ${weatherBitResponse.statusText}`);
    const weatherBitResult = await weatherBitResponse.json();
    weatherData.weatherbit = {
      api: 'WeatherBit',
      temp: weatherBitResult.data[0].temp,
      max_temp: weatherBitResult.data[0].max_temp,
      min_temp: weatherBitResult.data[0].min_temp,
      rh: weatherBitResult.data[0].rh,
      precip: weatherBitResult.data[0].precip
    };
  } catch (error) {
    console.error('Error fetching WeatherBit data:', error);
    weatherData.errorMessage = `${weatherData.errorMessage}\nWeatherBit data not available: ${error.message}`;
  }

  // Fetch AccuWeather data
  try {
    const locationResponse = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY_ACCUWEATHER}&q=${latitude},${longitude}`);
    if (!locationResponse.ok) throw new Error(`AccuWeather location not found: ${locationResponse.statusText}`);
    const locationData = await locationResponse.json();
    const locationKey = locationData.Key;

    const weatherResponse = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY_ACCUWEATHER}&language=en-us`);
    if (!weatherResponse.ok) throw new Error(`AccuWeather data not available: ${weatherResponse.statusText}`);
    const weatherResult = await weatherResponse.json();
    weatherData.accuweather = {
      api: 'AccuWeather',
      Temperature: weatherResult[0].Temperature,
      RelativeHumidity: weatherResult[0].RelativeHumidity,
      PrecipitationSummary: weatherResult[0].PrecipitationSummary
    };

    // Fetch Yesterday's AccuWeather data
    const yesterdayResponse = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}/historical/24?apikey=${API_KEY_ACCUWEATHER}&language=en-us`);
    if (!yesterdayResponse.ok) throw new Error(`AccuWeather yesterday data not available: ${yesterdayResponse.statusText}`);
    const yesterdayResult = await yesterdayResponse.json();
    weatherData.accuweather.yesterday = {
      Temperature: yesterdayResult[0].Temperature,
      RelativeHumidity: yesterdayResult[0].RelativeHumidity,
      PrecipitationSummary: yesterdayResult[0].PrecipitationSummary
    };

    // Fetch Tomorrow's AccuWeather data
    const tomorrowResponse = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY_ACCUWEATHER}&language=en-us`);
    if (!tomorrowResponse.ok) throw new Error(`AccuWeather tomorrow data not available: ${tomorrowResponse.statusText}`);
    const tomorrowResult = await tomorrowResponse.json();
    weatherData.accuweather.tomorrow = {
      Temperature: tomorrowResult.DailyForecasts[0].Temperature,
      RelativeHumidity: tomorrowResult.DailyForecasts[0].RelativeHumidity,
      PrecipitationSummary: tomorrowResult.DailyForecasts[0].PrecipitationSummary
    };
  } catch (error) {
    console.error('Error fetching AccuWeather data:', error);
    weatherData.errorMessage = `${weatherData.errorMessage}\nAccuWeather data not available: ${error.message}`;
  }

  // Fetch IMD data
  try {
    const imdResponse = await fetch(`https://api.mausam.imd.gov.in/v1/data?lat=${latitude}&lon=${longitude}&apikey=${API_KEY_IMD}`);
    if (!imdResponse.ok) throw new Error(`IMD data not available: ${imdResponse.statusText}`);
    const imdResult = await imdResponse.json();
    weatherData.imd = {
      api: 'IMD',
      temperature: imdResult.data.temperature,
      high: imdResult.data.high,
      low: imdResult.data.low,
      humidity: imdResult.data.humidity,
      rainfall: imdResult.data.rainfall,
      yesterday: imdResult.data.yesterday,
      tomorrow: imdResult.data.tomorrow
    };
  } catch (error) {
    console.error('Error fetching IMD data:', error);
    weatherData.errorMessage = `${weatherData.errorMessage}\nData not available: ${error.message}`;
  }

  return weatherData;
};
