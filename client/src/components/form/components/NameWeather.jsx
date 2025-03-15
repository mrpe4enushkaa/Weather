import React from "react";

export default function NameWeather({ name }) {
    return (
        <div className="form__inner-nameWeather">
            {name &&
                <span className="form__inner-weather ibm-plex-mono-semibold">
                    {name}
                </span>}
        </div>
    );
}