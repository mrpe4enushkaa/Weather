import React from "react";

export default function Parameters({wind, humidity}) {
    return (
        <div className="form__inner-parameters">
            <span className="ibm-plex-mono-semibold">Wind: {wind.speed} km/h</span>
            <span className="ibm-plex-mono-semibold">Humidity: {humidity}%</span>
        </div>
    );
}