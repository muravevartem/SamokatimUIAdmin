import React, {useEffect, useState} from "react";
import validator from 'validator';
import {
    Alert,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {Organization} from "../../../model/organizations";
import {isTel, SUCCESS_ALERT} from "../../../model/util";
import {organizationService} from "../../../service/OrganizationService";
import {AxiosError} from "axios";
import {AlertInfo, errorHandler} from "../../../error/ErrorHandler";
import {TelField} from "../../custom/Components";
import {MdApproval, MdSearch} from "react-icons/md";
import isEmpty = validator.isEmpty;
import isNumeric = validator.isNumeric;


export const OrganizationModPage = () => {

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
                {(!alert || alert.color !== 'success') &&
                    <ButtonGroup>
                        <Button
                            onClick={() => navigate(-1)}
                        >
                            Отмена
                        </Button>
                        <Button
                            disabled={alert?.color === 'error'}
                            variant='contained'
                            onClick={() => createOrg(organization)}
                        >
                            Готово
                        </Button>
                    </ButtonGroup>
                }
                {(alert && alert.color === 'success') &&
                    <Button variant='contained' onClick={() => navigate('/organizations')}>Список организаций</Button>
                }

            </Stack>
        </div>
    )
}

export const OrganizationModificationPage = () => {

    const [organization, setOrganization] = useState<Organization>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertInfo>()
    const navigate = useNavigate();

    let orgIdString = useParams()['orgId'] ?? '';
    if (!isNumeric(orgIdString))
        navigate(-1);

    const orgId = Number.parseInt(orgIdString);

    async function modifyOrg(org: Organization) {
        setLoading(true)
        try {
            await organizationService.modify(orgId, org);
            setAlert(SUCCESS_ALERT);
        } catch (e) {
            setAlert(errorHandler.handleError(e))
        } finally {
            setLoading(false);
        }
    }

    async function getOrg() {
        setLoading(true)
        try {
            let existOrg = await organizationService.getOne(orgId);
            setOrganization(existOrg);
        } catch (e) {
            setAlert(errorHandler.handleError(e))
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrg()
    }, [])

    useEffect(() => {
        setAlert(undefined);
    }, [organization])

    return (
        <div style={{padding: 10}}>
            <Stack minHeight='100vh'
                   spacing={4}
                   alignItems='center'
                   justifyContent='center'>
                <Alert color='info'>Внесенные изменение будут отправлены на повторную модерацию</Alert>
                <Typography color="inherit" variant='h5'>
                    Редактирование
                </Typography>
                {alert &&
                    <Alert variant='filled' severity={alert.color}>{alert.message}</Alert>
                }
                <OrganizationModificationComponent
                    org={organization}
                    setOrg={setOrganization}
                    loading={loading}/>
                {(!alert || alert.color !== 'success') &&
                    <ButtonGroup>
                        <Button
                            onClick={() => navigate(-1)}
                        >
                            Отмена
                        </Button>
                        <Button
                            disabled={alert?.color === 'error'}
                            variant='contained'
                            onClick={() => modifyOrg(organization)}
                        >
                            Готово
                        </Button>
                    </ButtonGroup>
                }
                {(alert && alert.color === 'success') &&
                    <Button variant='contained' onClick={() => navigate('/organizations')}>Список организаций</Button>
                }

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

    async function searchByInn() {
        try {
            if (org.inn) {
                setOrg(await organizationService.searchByInn(org.inn));
            }
        } catch (e) {

        }
    }

    return (
        <Stack spacing={2}>
            <TextField
                fullWidth
                variant='standard'
                disabled={(!!org.inn)}
                error={!!org.name && isEmpty(org.name)}
                label='Название'
                value={org.name ?? ''}
                onChange={event =>
                    setOrg({
                        ...org,
                        name: event.target.value,
                        fullName: event.target.value
                    })}/>
            <Grid container alignItems='end'>
                <Grid item xs={10}>
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
                            })}
                    />
                </Grid>
                <Grid item xs={2}>
                    <IconButton
                        onClick={searchByInn}
                        color='primary'
                    >
                        <MdSearch/>
                    </IconButton>
                </Grid>
            </Grid>
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


export function OrganizationApprovingComponent(props: {
    org: Organization,
    open: boolean,
    onClose: () => any;
}) {
    const [alert, setAlert] = useState<AlertInfo>();
    const [loading, setLoading] = useState(false);

    async function verifyOrg() {
        try {
            setLoading(true);
            await organizationService.approve(props.org.id ?? -1)
            setAlert({
                icon: <MdApproval/>,
                message: 'Данные об организации утверждены',
                color: 'success'
            })
        } catch (e) {
            setAlert(errorHandler.handleError(e))
        } finally {
            setLoading(true);
        }
    }

    return (
        <Dialog
            open={props.open}
            onClose={() => props.onClose()}
        >
            <DialogTitle>
                Верификация организации
            </DialogTitle>
            <DialogContent>
                {alert &&
                    <Alert
                        icon={alert.icon}
                        color={alert.color}
                    >
                        {alert.message}
                    </Alert>}
                Организация {props.org.name}
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={
                        loading
                        || props.org.status !== 'PENDING'
                        || alert?.color === 'success'
                    }
                    onClick={() => verifyOrg()}
                >
                    Подтвердить
                </Button>
            </DialogActions>
        </Dialog>
    )
}
