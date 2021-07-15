import React from "react";

export const LocationInfo = (props) => {

    const data = props.locationInfo

    return (
        <div className="w-100 mx-2 mt-2">
            <h3>{data.city}</h3>
        </div>
    )
}