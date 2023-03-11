import validator from "validator";
import {AlertInfo} from "../error/ErrorHandler";
import isNumeric = validator.isNumeric;

export type Page<T> = {
    content: T[],
    size: number,
    page: number
}

export type Pageable = {
    page: number,
    size: number
}

export function isTel(tel: string) {
    return isNumeric(tel) && tel.length === 10;
}


export const SUCCESS_ALERT: AlertInfo = {
    color: 'success',
    message: 'Отправлена на модерацию'
}
