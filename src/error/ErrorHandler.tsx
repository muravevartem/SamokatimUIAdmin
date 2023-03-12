import {AxiosError} from "axios";
import {AlertColor} from "@mui/material/Alert/Alert";
import React from "react";
import {MdErrorOutline} from "react-icons/md";

export type AlertInfo = {
    color: AlertColor,
    message: React.ReactNode,
    icon?: React.ReactNode
}

const ERROR_ICON = <MdErrorOutline/>

export class ErrorHandler {
    handleAxiosError(e: AxiosError): AlertInfo {
        // @ts-ignore
        let message = e.response?.data?.message;

        return (message)
            ? {
                color: 'error',
                message: message,
                icon: ERROR_ICON
            }
            : {
                color: 'error',
                message: 'Сервер не отвечает',
                icon: ERROR_ICON
            }

    }

    handleError(e: any): AlertInfo {
        if (e instanceof AxiosError)
            return this.handleAxiosError(e);
        return {
            color: 'error',
            message: 'Неизвестная ошибка',
            icon: ERROR_ICON
        }
    }
}

export const errorHandler = new ErrorHandler();
