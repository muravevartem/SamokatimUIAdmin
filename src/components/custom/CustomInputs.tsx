import React, {useEffect, useState} from "react";
import {AlertInfo, errorHandler} from "../../error/ErrorHandler";
import {Alert, Autocomplete, TextField} from "@mui/material";
import {Page} from "../../model/util";

type DictionaryType = { id?: number, name?: string };

export function ObjectField<T extends DictionaryType>(props: {
    value?: T
    onChange: (obj: T) => any
    label?: string
    disable?: boolean
    getter?: (textValue: string) => Promise<T[]>
    getterPaged?: (textValue: string) => Promise<Page<T>>
    placeholder?: string,
    optionLabel?: (obj: T) => string
}) {
    const [loading, setLoading] = useState(false);
    const [textValue, setTextValue] = useState<string>('');
    const [options, setOptions] = useState<readonly T[]>([]);
    const [alert, setAlert] = useState<AlertInfo>();
    const [open, setOpen] = useState(false);

    async function getAll() {
        if (open) {
            try {
                setLoading(true);
                if (props.getter) {
                    let values = await props.getter(textValue);
                    setOptions(values);
                }
                if (props.getterPaged) {
                    let page = await props.getterPaged(textValue);
                    setOptions(page.content);
                }
            } catch (e) {
                setAlert(errorHandler.handleError(e))
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        getAll();
    }, [open, textValue])

    if (alert)
        return (
            <Alert icon={alert.icon} color={alert.color}>
                {alert.message}
            </Alert>
        )

    return <Autocomplete
        renderInput={params =>
            <TextField
                {...params}
                fullWidth
                label={props.label}
                variant='standard'
                placeholder={props.placeholder}
            />
        }
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        loading={loading}
        loadingText='Подгружаю список...'
        noOptionsText='Пусто'
        value={props.value}
        onChange={(event, value) => props.onChange(value as T)}
        onInputChange={(event, value) => setTextValue(value)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={option => props.optionLabel ? props.optionLabel(option) : `${option.name}`}
        options={options}
    />
}
