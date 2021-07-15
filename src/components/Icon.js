import React from "react";
import {IMGPATHURL} from "../const/consts";

export const Icon = (props) => {
    const iconID = props.icon
    const alt = props.alt || 'weather icon'
    return (
        <img width="50" height="50" src={`${IMGPATHURL}${iconID}.png`} alt={alt} className="align-self-centera"/>
    )
}