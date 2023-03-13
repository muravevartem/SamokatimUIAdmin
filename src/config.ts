import axios from "axios";

type Api = {
    handbook: string,
    monitor: string
}

const generateServerUrl = (): Api => {
    const nodeenv = process.env.NODE_ENV;
    console.log(nodeenv)
    if (nodeenv === 'production') {
        return {
            handbook: 'https://handbook.1304294-cu57808.tw1.ru',
            monitor: 'https://monitor.1304294-cu57808.tw1.ru'
        }
    }
    return {
        handbook: 'http://localhost:8080',
        monitor: 'http://localhost:8081'
    };
}

export const API_URL = generateServerUrl();

export const $apiHandbook = axios.create({
    withCredentials: true,
    baseURL: API_URL.handbook,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const $apiMonitor = axios.create({
    withCredentials: true,
    baseURL: API_URL.monitor,
    headers: {
        'Content-Type': 'application/json'
    }
})

