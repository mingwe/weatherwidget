import React from "react";

export const Map = (props) => {
    const lat = props.lat || '0.0'
    const lon = props.lon || '0.0'
    const src = `https://maps.google.com/maps?q=${lat},${lon}&output=embed&z=11`
    return (
        <iframe
            src={src}
            width="100%"
            height="100%"
            loading="lazy"
            className="rounded-xl"
        />
    )
}