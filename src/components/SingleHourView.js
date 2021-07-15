import React from "react";
import {timestampToHours, kelvinToCelsius} from "../functions/functions";
import {Icon} from "./Icon";

export const SingleHourView = (props) => {

    const data = props.data


    return (
        <div className="col">
            <p className="mb-0">
                {timestampToHours(data.dt)}
            </p>
            <p className="mb-0">
                <Icon icon={data.weather[0].icon} />
            </p>
            <p>
                {kelvinToCelsius(data.temp)}
            </p>
        </div>
    )
}