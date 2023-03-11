import React, {useEffect, useState} from "react";
import validator from 'validator';
import {Alert, Button, ButtonGroup, Stack, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Organization} from "../../../model/organizations";
import {isTel, SUCCESS_ALERT} from "../../../model/util";
import {organizationService} from "../../../service/OrganizationService";
import {AxiosError} from "axios";
import {AlertInfo, errorHandler} from "../../../error/ErrorHandler";
import {TelField} from "../../custom/Components";
import isEmpty = validator.isEmpty;
import isNumeric = validator.isNumeric;


export const OrganizationRegistrationPage = () => {

    const [organization, setOrganization] = useState<Organization>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertInfo>()
    const navigate = useNavigate();

    async function createOrg(org: Organization) {
        setLoading(true)
        try {
            await organizationService.create(org);
            setAlert(SUCCESS_ALERT);
        } catch (e) {
            if (e instanceof AxiosError) {
                setAlert(errorHandler.handleAxiosError(e))
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setAlert(undefined);
    }, [organization])

    return (
        <div style={{padding: 10}}>
            <Stack minHeight='100vh'
                   spacing={4}
                   alignItems='center'
                   justifyContent='center'>
                <Typography color="inherit" variant='h5'>
                    Регистрация организации
                </Typography>
                {alert &&
                    <Alert variant='filled' severity={alert.color}>{alert.message}</Alert>
                }
                <OrganizationModificationComponent
                    org={organization}
                    setOrg={setOrganization}
                    loading={loading}/>
                <ButtonGroup>
                    <Button onClick={() => navigate(-1)}>Отмена</Button>
                    <Button variant='contained' onClick={() => createOrg(organization)}>Готово</Button>
                </ButtonGroup>
            </Stack>
        </div>
    )
}

const OrganizationModificationComponent = (props: {
    org: Organization,
    setOrg: (org: Organization) => any,
    loading: boolean
}) => {
    let {org, setOrg, loading} = props;
    console.log(org.tel)
    return (
        <Stack spacing={2}>
            <TextField
                fullWidth
                variant='standard'
                error={!!org.name && isEmpty(org.name)}
                label='Название'
                value={org.name ?? ''}
                onChange={event =>
                    setOrg({
                        ...org,
                        name: event.target.value,
                        fullName: event.target.value
                    })}/>
            <TextField
                fullWidth
                variant='standard'
                error={
                    (!!org.inn)
                    && (
                        !isNumeric(org.inn ?? '')
                        || (org.inn?.length !== 10 && org.inn?.length !== 12)
                    )
                }
                label='ИНН'
                placeholder='xxxxxxxxxx'
                value={org.inn ?? ''}
                onChange={event =>
                    setOrg({
                        ...org,
                        inn: isEmpty(event.target.value) || isNumeric(event.target.value)
                            ? event.target.value
                            : org.inn
                    })}/>
            <TelField
                fullWidth
                variant='standard'
                error={!!org.tel && !isTel(org.tel ?? '')}
                label='Номер телефона'
                placeholder='+7-xxx-xx-xx-xxx'
                inputMode='tel'
                value={org.tel ?? ''}
                disabled={loading}
                onChange={event =>
                    setOrg({
                        ...org,
                        tel: event.target.value
                    })}/>
            <TextField
                fullWidth
                variant='standard'
                error={!!org.email && !validator.isEmail(org.email ?? '')}
                label='Адрес электронной почты'
                placeholder='mail@samokatim.ru'
                value={org.email ?? ''}
                disabled={loading}
                onChange={event =>
                    setOrg({
                        ...org,
                        email: event.target.value
                    })}/>
        </Stack>
    )
}
