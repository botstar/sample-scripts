// NOTE: To use this script correctly,
// you need to make sure that the bot have to have a flow variable name `foundCity`,
// which is used for marking the city user entered whether is found or not

const URL = require('url').URL;
const request = require('request');

/**
 * Fetch forecast data from openweathermap service
 */
const getWeatherData = () => {
  // get the latest user response which is a city name
  // More details at https://docs.botstar.com/en/scripting.html#event
  const city = event.conversation.userResponses.latest_response;
  const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=700768c90c6fa03a13bcdf672f51927a&q=${city}`;
  return new Promise(resolve => {
    request(weatherUrl, function (error, response, body) {
      const data = JSON.parse(body || response || {});
      resolve(data);
    });
  });
};

/**
 * Fetch weather status code for mapping with openweathermapp id
 */
const getWeathersStatusMapping = () => {
  const weatherUrl = 'https://raw.githubusercontent.com/botstar/sample-scripts/master/weathers/data/weather-status.json';
  return new Promise(resolve => {
    request(weatherUrl, function (error, response, body) {
      const data = JSON.parse(body || response || {});
      resolve(data);
    });
  });
};

/**
 * Parse weather data into horizontal list message
 * More details at https://docs.botstar.com/en/json-formats.html#horizontal-list-block
 * @param {*} data forecast which is fetched from weather service
 */
const parseForecastMessages = async (data) => {
  const { name, country } = data.city;
  const weathers = await getWeathersStatusMapping();

	const cards = (data.list || []).map(forecast => {
    const { id } = forecast.weather[0];
    const { temp_max, temp_min, temp, humidity } = forecast.main;
    const weather = weathers[String(id)];
    const title = forecast.dt_txt;
    const desc =
`${name}, ${country} - ${temp}F\n
${temp_min}F - ${temp_max}F\n
${weather.desc}\n
Humidity ${humidity}%`;
    const message = {
      "title": title,
      "subtitle": desc,
      "image": weather.iconUrl
    };
    return message;
  }).slice(0, 10);

  return { cards };
};

// Main Process
(async function () {
  const weather = await getWeatherData();
  const foundCity = String(weather.cod) === '200';
  const message = foundCity ? await parseForecastMessages(weather) : {};

  // More details at https://docs.botstar.com/en/scripting.html#done
  var response = {
    messages: [].concat(message),
    actions: [
      {
        type: 'set_variable',
        data: {
          foundCity: foundCity ? '1' : '0'
        }
      }
    ]
  };
  done(response); // This is required.
})()
