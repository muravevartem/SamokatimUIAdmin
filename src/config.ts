import axios from "axios";

export const SERVER_URL = "http://127.0.0.1:8080";

const $api = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default $api;
