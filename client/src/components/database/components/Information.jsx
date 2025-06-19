import React from "react";

export default function Information({ data }) {
    return (
        <div className="database__block database__information"
            style={{ backgroundColor: data.color }}
        >
            <div className="database__information-grid">
                <span className="ibm-plex-mono-semibold database__information--text">{data.city}</span>
                <span className="ibm-plex-mono-semibold">{data.weather}</span>
                <span className="ibm-plex-mono-semibold">
                    {data.temperature}
                    <sup className="opacity">o</sup>
                    <span className="opacity">C</span>
                </span>
                <span className="ibm-plex-mono-semibold">{data.wind} km/h</span>
                <span className="ibm-plex-mono-semibold">{data.humidity}%</span>
                <span className="ibm-plex-mono-semibold">{data.date}</span>
            </div>
        </div>
    );
}