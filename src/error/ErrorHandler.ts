import {AxiosError} from "axios";
import {AlertColor} from "@mui/material/Alert/Alert";

export type AlertInfo = {
    color: AlertColor,
    message: string
}

export class ErrorHandler {
    handleAxiosError(e: AxiosError): AlertInfo {
        // @ts-ignore
        let message = e.response.data.message;

        return (message)
            ? {
                color: 'error',
                message: message
            }
            : {
                color: 'error',
                message: 'Сервер не отвечает'
            }

    }
}

export const errorHandler = new ErrorHandler();
