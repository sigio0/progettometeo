import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureLow, faTemperatureHigh, faTint, faWind, faCloud, faSun, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Results = () => {
  const params = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${params.dinamicId},uk&APPID=5f2569959cfc9600ef45064ba9f8c714`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setWeatherData(data);
       
        if (data.coord) {
          fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=5f2569959cfc9600ef45064ba9f8c714`)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error('Network response was not ok.');
            })
            .then(data => {
              
              const filteredForecast = data.list.filter(forecast => {
                
                return forecast.dt_txt.includes("12:00:00");
              });
              setForecastData(filteredForecast);
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [params.dinamicId]);

  return (
    <div className="container mt-5 text-center">
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <FontAwesomeIcon icon={faCloud} size="10x" className="mb-3" />
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <p className="fs-5"><FontAwesomeIcon icon={faTemperatureLow} size="2x" /> Temperature: {weatherData.main.temp} K</p>
              <p className="fs-5"><FontAwesomeIcon icon={faTemperatureHigh} size="2x" /> Feels Like: {weatherData.main.feels_like} K</p>
              <p className="fs-5"><FontAwesomeIcon icon={faTint} size="2x" /> Humidity: {weatherData.main.humidity}%</p>
            </div>
            <div className="col-md-6">
              <p className="fs-5"><FontAwesomeIcon icon={faWind} size="2x" /> Wind Speed: {weatherData.wind.speed} m/s</p>
              <p className="fs-5"><FontAwesomeIcon icon={faSun} size="2x" /> Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p className="fs-5"><FontAwesomeIcon icon={faClock} size="2x" /> Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      )}
      {forecastData && (
        <div className="mt-5">
          <h2>Forecast for the next 5 days</h2>
          <div className="row justify-content-center">
            {forecastData.map((forecast, index) => (
              <div key={index} className="col-md-2 mb-4">
                <div className="card p-3" style={{ backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                  <h5 className="card-title"><FontAwesomeIcon icon={faCalendarAlt} /> {new Date(forecast.dt * 1000).toLocaleDateString()}</h5>
                  <p className="card-text"><FontAwesomeIcon icon={faTemperatureLow} /> Min Temp: {forecast.main.temp_min} K</p>
                  <p className="card-text"><FontAwesomeIcon icon={faTemperatureHigh} /> Max Temp: {forecast.main.temp_max} K</p>
                  <p className="card-text"><FontAwesomeIcon icon={faTint} /> Humidity: {forecast.main.humidity}%</p>
                  <p className="card-text"><FontAwesomeIcon icon={faWind} /> Wind Speed: {forecast.wind.speed} m/s</p>
                  <p className="card-text"><FontAwesomeIcon icon={faCloud} /> Description: {forecast.weather[0].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
