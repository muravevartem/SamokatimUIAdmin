import {AxiosError} from "axios";
import {ArgsProps} from "antd/es/notification/interface";

export class ErrorHandler {
    handleAxiosError(e: AxiosError): ArgsProps {
        switch (e.status) {
            case 404:
                return {
                    key: 'axios-error-404',
                    message: 'Ресурс не найден'
                }
            case 403:
                return {
                    key: 'axios-error-403',
                    message: 'Нет доступа'
                }
            case 401:
                return {
                    key: 'axios-error-401',
                    message: 'Не авторизирован'
                }
            case 400:
                return {
                    key: 'axios-error-400',
                    message: 'Невалидный запрос'
                }
        }
        return {
            key: 'unknown',
            message: 'Неизвестная ошибка'
        }

    }
}

export const errorHandler = new ErrorHandler();
