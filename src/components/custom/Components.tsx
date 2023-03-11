import React from "react";
import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import validator from "validator";
import isNumeric = validator.isNumeric;

export const TelField = (props: TextFieldProps) => {
    return (
        <TextField
            {...props}
            value={beautifulTel(props.value?.toString())}
            onChange={event => {
                let norm = normalTel(event.target.value);
                return props.onChange?.({
                    ...event,
                    target: {
                        ...event.target,
                        value: !norm || isNumeric(norm ?? '')
                            ? norm ?? ''
                            : props.value?.toString() ?? ''
                    }
                });
            }}
        />
    )
}


export function beautifulTel(tel?: string) {
    if (!tel)
        return tel;

    let beautifulTel = '+7'
    if (tel.length > 0) {
        beautifulTel += '-';
        beautifulTel += tel.substring(0, 3);
        if (tel.length > 3) {
            beautifulTel += '-';
        }
        beautifulTel += tel.substring(3, 6)
        if (tel.length > 6) {
            beautifulTel += '-';
        }
        beautifulTel += tel.substring(6, 8)
        if (tel.length > 8) {
            beautifulTel += '-'
        }
        beautifulTel += tel.substring(8, 10)
    }
    return beautifulTel;
}

export function normalTel(raw?: string) {
    if (!raw)
        return raw;

    if (!raw.startsWith('+7-'))
        return raw;

    return raw.substring(3, 6)
        + raw.substring(raw[6] === '-' ? 7 : 6, 10)
        + raw.substring(raw[10] === '-' ? 11 : 10, 13)
        + raw.substring(raw[13] === '-' ? 14 : 13, 16);
}
