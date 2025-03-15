import React, { useEffect, useState } from "react";
import Button from "../Button";
import Name from "./components/Name";
import Informations from "./components/Informations";

export default function Database() {
    const [data, setData] = useState(null);

    function sortFunc(array) {
        if (array.length < 2) return array;

        let centerElement = array[0];
        let firstElement = array.slice(1).filter(element => element <= centerElement);
        let endElement = array.slice(1).filter(element => element > centerElement);

        return [...sortFunc(firstElement), centerElement, ...sortFunc(endElement)];
    }

    function getData() {
        fetch('http://localhost:2000/api/getData')
            .then(response => response.json())
            .then(data => setData(data));
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="database">
            <div className="database__inner">
                <Name />
                <Informations data={data} />
            </div>
            <Button path="/" />
        </div>
    );
}