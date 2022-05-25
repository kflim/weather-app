import React from "react";
import WeatherLookup from "./components/WeatherLookup";

function App() {
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=35&appid=bac8236c7a5c5766de9c8c5415751152"

  return (
    <div className="app">
      <WeatherLookup />
    </div>
  );
}

export default App;
