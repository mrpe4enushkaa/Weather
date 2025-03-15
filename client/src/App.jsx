import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Form from './components/form/Form'
import Database from './components/database/Database';
import Error from './components/Error';
import './fonts.scss';
import './App.scss';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Form />} />
                <Route path='/database' element={<Database />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}