import React, { useState } from "react";
import { useUpdateEffect } from "usehooks-ts";
import defaultBackground from "../images/cloudyday.jpg";
import SubmitSection from "./SubmitSection";
import WeatherInfo from "./WeatherInfo";

const WeatherLookup = () => {
  const [imageUrl, setImageUrl] = useState(defaultBackground);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState({});

  useUpdateEffect(() => {
    const fetchWeatherData = async () => {
      const weatherData = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=bac8236c7a5c5766de9c8c5415751152`
      )
        .then((fetchedData) => fetchedData.json())
        .then((jsonData) => jsonData[0])
        .then((data) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=bac8236c7a5c5766de9c8c5415751152`
          )
        );

      setLocationData(await weatherData.json());
    };

    fetchWeatherData();
  }, [location]);

  function handleSubmit(event) {
    event.preventDefault();
    setLocation(input);
  }

  function handleChange(event) {
    setInput(event.target.value);
  }

  return (
    <div>
      <img
        src={imageUrl}
        className="card-img -z-1 position-fixed h-full w-full"
        alt="..."
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <div className="card-img-overlay">
                <SubmitSection
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                  input={input}
                />
                <WeatherInfo
                  locationData={locationData}
                  setImageUrl={setImageUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherLookup;
