const WEATHER_API_KEY = '2c8c22e7283717b657e8dd338db9fc51';

export const getWeather = city =>
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&APPID=${WEATHER_API_KEY}`
  )
    .then(response => {
      return response.json();
    })
    .then(body => {
      if (body.cod !== 200) {
        throw new Error(body.message);
      }
      return {
        city: body.name,
        temperature: body.main.temp,
        meteo: body.weather[0].main,
        description: body.weather[0].description,
        icon: `http://openweathermap.org/img/w/${body.weather[0].icon}.png`
      };
    });
