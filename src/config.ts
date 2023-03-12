import axios from "axios";

const generateServerUrl = () => {
    const nodeenv = process.env.NODE_ENV;
    console.log(nodeenv)
    if (nodeenv === 'production')
        return 'https://api.1218407-cu57808.tw1.ru'
    return 'http://localhost:8080';
}

export const SERVER_URL = generateServerUrl();

const $api = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default $api;
