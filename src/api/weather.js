const KEY = '2c8c22e7283717b657e8dd338db9fc51';

const url = `http://api.openweathermap.org/data/2.5/weather?units=metric&q={0}&APPID=${KEY}`;

class Weather {
  getWeather(city) {
    return fetch(url.replace('{0}', city))
      .then(response => response.json())
      .then(body => {
        if (body.cod === 200) {
          return {
            city: body.name,
            temperature: body.main.temp,
            meteo: body.weather[0].main,
            description: body.weather[0].description,
            icon: `http://openweathermap.org/img/w/${body.weather[0].icon}.png`
          };
        }
        throw new Error(body.message);
      });
  }
}

export default new Weather();
