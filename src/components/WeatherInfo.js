import React from "react"
import {SingleHourView} from "./SingleHourView"
import {kelvinToCelsius} from "../functions/functions"
import {Icon} from "./Icon";

export const WeatherInfo = (props) => {

    const data = props.weatherData
    const hoursSliced = data.hourly.slice(0, 4) // we need only 4 hours forecast

    return (
        <div className="w-100">

            <div className="d-flex mb-3">

                <span className="display-3">
                    {kelvinToCelsius(data.current.temp)}
                </span>

                <span className="align-self-center mx-2">
                    <Icon icon={data.current.weather[0].icon} alt={data.current.weather[0].description}/>
                </span>

                <span className="text-capitalize align-self-center">
                    {data.current.weather[0].description}
                </span>

            </div>

            <div className="row text-center">
                { hoursSliced.map((item, index) =>
                    <SingleHourView key={index} data={item}/>
                ) }
            </div>

        </div>
    )
}