import React, { useState } from "react";
import { useInterval, useUpdateEffect } from "usehooks-ts";

const WeatherInfo = (props) => {
  const locationData = props.locationData;

  const [date, setDate] = useState(new Date());
  const [weatherEmoji, setWeatherEmoji] = useState("");

  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.toLocaleString("default", { month: "long" });
  let weekDay = date.toLocaleString("default", { weekday: "long" });

  let time = date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  function updateTime() {
    setDate(new Date());
    day = date.getDate();
    year = date.getFullYear();
    month = date.toLocaleString("default", { month: "long" });
    weekDay = date.toLocaleString("default", { weekday: "long" });

    time = date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  function updateEmoji() {
    switch (locationData.weather[0].main) {
      case "Clouds":
        setWeatherEmoji("fa-cloud");
        break;
      case "Thunderstorm":
        setWeatherEmoji("fa-bolt");
        break;
      case "Drizzle":
        setWeatherEmoji("fa-cloud-rain");
        break;
      case "Rain":
        setWeatherEmoji("fa-cloud-showers-heavy");
        break;
      case "Snow":
        setWeatherEmoji("fa-snow-flake");
        break;
      default:
        setWeatherEmoji("fa-smog");
        break;
    }
  }

  useUpdateEffect(() => {
    if (typeof locationData.main != "undefined") {
      updateEmoji();

      // Client_id is directly used in fetch request, which feels safer instead of using a const in case of an attack
      // but I'm not sure whether it's needed
      fetch(
        `https://api.unsplash.com/photos/random/?query=${locationData.weather[0].main}&client_id=JpgvGCDsd7Vd41rwOAi95XdNTOb3iFctmGAwLaWfN2o`
      )
        .then((response) => response.json())
        .then((jsonData) => jsonData.urls.regular)
        .then((url) => props.setImageUrl(url));
    }
  }, [locationData]);

  useInterval(() => updateTime(), 1000);

  function convertKelvinToCelsius(temperature) {
    return (temperature - 273.15).toFixed(1);
  }

  return (
    <div className="bg-dark bg-opacity-50 py-3">
      <h2 className="card-title">
        {Object.keys(locationData).length > 0 && locationData.name}
      </h2>
      <p className="card-text lead">
        {weekDay}, {month} {day}, {year}
        <br />
        {time}
      </p>
      <hr />
      <i className={`fas ${weatherEmoji} fa-4x`}></i>
      {Object.keys(locationData).length > 0 && (
        <h1 className="fw-bolder mb-5">
          {convertKelvinToCelsius(locationData.main.temp)} &deg;C
        </h1>
      )}
      {Object.keys(locationData).length > 0 && (
        <p className="lead fw-bolder mb-0">{locationData.weather[0].main}</p>
      )}
      {Object.keys(locationData).length > 0 && (
        <p className="lead">
          {convertKelvinToCelsius(locationData.main.temp_min)} &deg;C |
          {convertKelvinToCelsius(locationData.main.temp_max)} &deg;C
        </p>
      )}
    </div>
  );
};

export default WeatherInfo;
