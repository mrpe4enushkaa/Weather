import React from "react";

export default function FormInnerTemprature(props) {
    return (
        <div className={'temperature-text'}>
            <span className="temperature ibm-plex-mono-semibold">
                {Math.round(props.temperature)}
                <sup className="opacity">o</sup>
                <span className="opacity">C</span>
            </span>
        </div>
    );
}