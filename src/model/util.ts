import validator from "validator";
import {AlertInfo} from "../error/ErrorHandler";
import isNumeric = validator.isNumeric;

export type Page<T> = {
    content: T[],
    size: number,
    page: number,
    last: boolean,
    first: boolean,
    totalPages: number,
    totalElements: number
}

export type Pageable = {
    page: number,
    size: number
}

export function emptyPage<T>(): Page<T> {
    return {
        content: [],
        size: 30,
        page: 0,
        last: true,
        first: true,
        totalPages: 1,
        totalElements: 0
    }
}

export function isTel(tel: string) {
    return isNumeric(tel) && tel.length === 10;
}


export const SUCCESS_ALERT: AlertInfo = {
    color: 'success',
    message: 'Отправлена на модерацию'
}
