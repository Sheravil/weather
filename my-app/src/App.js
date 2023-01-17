import React, { useState } from "react";
// import fetch from 'node-fetch';
import axios from "axios";
import { WiHumidity, WiThermometer } from "react-icons/wi";
import { FiWind } from "react-icons/fi";

function App() {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=90380c6aca2d44c2033e02ab3c6ed1ed&lang=tr`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
      setLocation("");
    }
  };
  const main = data.weather?.[0].main;
  return (
    <div
      className={
        main === "Clouds"
          ? "Clouds"
          : null || main === "Clear"
          ? "Clear"
          : null || main === "Snow"
          ? "Snow"
          : null || main === "Rain"
          ? "Rain"
          : null || main === "Mist"
          ? "Mist"
          : null || main === "Drizzle"
          ? "Rain"
          : "Clouds"
      }
    >
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Şehir Giriniz"
          onKeyPress={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name ? data.name : "--"}</p>
          </div>
          <div className="temp">
            <h1 style={{ fontSize: "5rem" }}>
              {data.main ? `${data.main.temp.toFixed()} ` : "--"}
            </h1>
            {data.main ? <h2> °C</h2> : null}
          </div>
          <div className="description">
            <p>
              {data.weather
                ? data.weather[0].description[0].toUpperCase() +
                  data.weather[0].description.substring(1)
                : "--"}
            </p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>
              {data.main ? `${data.main.feels_like.toFixed()}°` : "--"}{" "}
              <h1 style={{ fontSize: "32px" }}>
                <WiThermometer />
              </h1>
            </p>
          </div>
          <div className="humidity">
            <p>
              {data.main ? `${data.main.humidity} ` : "--"}{" "}
              <h1 style={{ fontSize: "32px" }}>
                <WiHumidity />
              </h1>
            </p>
          </div>
          <div className="wind">
            <p>
              {data.wind ? `${data.wind.speed.toFixed()} ` : "--"}{" "}
              <h1 style={{ fontSize: "32px" }}>
                <FiWind />
              </h1>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
