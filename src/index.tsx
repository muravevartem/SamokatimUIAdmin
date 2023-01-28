import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css'
import moment from "moment";
import {MyApp} from "./MyApp";
import 'moment/locale/ru'

moment.locale('ru')

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <MyApp/>
    </React.StrictMode>
);


