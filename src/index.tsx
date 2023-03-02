import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css'
import moment from "moment";
import {MyApp} from "./MyApp";
import 'moment/locale/ru'
import {keycloak} from "./keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {authService} from "./services/AuthService";

moment.locale('ru')

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ReactKeycloakProvider
        initOptions={{ onLoad: 'check-sso' }}
        authClient={keycloak}
        autoRefreshToken={true}
        onTokens={x => authService.saveAccessToken(x.token??'')}
    >
        <MyApp/>
    </ReactKeycloakProvider>

);


