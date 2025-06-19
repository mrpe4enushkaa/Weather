import React from "react";
import Information from "./Information";
import TypesInformation from "./TypesInformation";

export default function Informations({ data }) {
    return (
        <div className="database__informations">
            <TypesInformation />
            {Array.isArray(data) && data.length > 0 ? (
                data.map((array, index) => (
                    <Information data={array} key={index} />
                ))
            ) : (
                <p className="ibm-plex-mono-semibold" style={{color: "#fff", fontSize: "32px"}}>No data</p>
            )}
        </div>
    );
}