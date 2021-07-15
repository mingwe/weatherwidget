import '../styles/styles.css';
import React, {useEffect, useState} from 'react'
import {WeatherInfo} from "./WeatherInfo"
import {LocationInfo} from "./LocationInfo";
import {Loader} from "./Loader";
// import {PLACEID} from "../const/consts";
import {Map} from "./Map";


function Widget() {


    const setError = () => {
        setState( prev => {
            return {
                ...prev,
                hasError: true
            }
        })
    }

    const fetchLocation = () => {
        const getIPURL = 'http://ip-api.com/json/';

        fetch(getIPURL)
            .then(res => res.json())
            .then(res => {
                setState( prev => {
                    return {
                        ...prev,
                        location: {
                            data: res,
                            isLoaded: true
                        }
                    }
                })
            })
    }

    const fetchWeather = (lat, lon) => {
        const weatherURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely&appid=${process.env.REACT_APP_API_KEY}`;
        fetch(weatherURL)
            .then(res => res.json())
            .then(res => {
                if(res.error || (res.cod > 400)) {
                    throw(res.error);
                    setError()
                }
                else {
                    setState( prev => {
                        return {
                            ...prev,
                            weather: {
                                data: res,
                                isLoaded: true
                            }
                        }
                    })
                }
                return res
            })
            .catch(error => {
                setError()
            })
    }

    const [state, setState] = useState({
        weather: {
            isLoaded: false,
            data: {}
        },
        location: {
            isLoaded: false,
            data: {}
        },
        bg: 'bg-init'
    })


    useEffect( () => {
            fetchLocation()
        }, []
    )

    useEffect( () => {
        if (state.location.isLoaded) {
            fetchWeather(state.location.data.lat, state.location.data.lon)
        }
    }, [state.location.isLoaded])

    useEffect( () => {
        if (state.weather.isLoaded) {

            let bg;
            switch (state.weather.data.current.weather[0].id) {
                case 502:
                    bg = 'bg-rain'
                    break
                case 800:
                    bg = 'bg-sunny'
                    break
                case 801:
                case 802:
                case 803:
                case 804:
                    bg = 'bg-cloud'
                    break
                default:
                    bg = 'bg-sunny'
            }

            setState( prev => {
                return {
                    ...prev,
                    bg: bg
                }
            })
        }
    }, [state.weather.isLoaded])


    return (
        <div
            className={`Widget py-5 bg-app ${state.bg}`}
        >
          <div className="container py-5">
              <div className="main-content bg-dark-transp text-light rounded-xl py-3 px-3">
                      {state.location.isLoaded
                          ? <LocationInfo locationInfo={state.location.data}/>
                          : <Loader/>
                      }
                      <div className="row mt-2">
                          <div className="col-xs-12 col-sm-9">
                              {state.weather.isLoaded
                                  ? <WeatherInfo weatherData={state.weather.data} lat={state.location.data.lat} lon={state.location.data.lon}/>
                                  : <Loader/>
                              }
                          </div>
                          <div className="col-xs-12 col-sm-3">
                              {state.location.isLoaded
                                  ? <Map lat={state.location.data.lat} lon={state.location.data.lon}/>
                                  : <Loader/>
                              }
                          </div>
                      </div>
                  </div>
          </div>
        </div>
    )
}

export default Widget;
