import React, {useEffect, useState} from "react";
import {Equipment, EquipmentAttribute, EquipmentParameter} from "../../../model/equipments";
import {AlertInfo, errorHandler} from "../../../error/ErrorHandler";
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Button, ButtonGroup, Grid, IconButton, Stack, TextField, Typography} from "@mui/material";
import validator from "validator";
import {equipmentService} from "../../../service/EquipmentService";
import {MdAdd, MdDelete} from "react-icons/md";
import {ObjectField} from "../../custom/CustomInputs";
import {organizationService} from "../../../service/OrganizationService";
import isEmpty = validator.isEmpty;
import isNumeric = validator.isNumeric;

export const EquipmentModificationPage = () => {
    const [equipment, setEquipment] = useState<Equipment>({})
    const [equipmentParams, setEquipmentParams] = useState<EquipmentParameter[]>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertInfo>();
    const navigate = useNavigate();

    let equipmentIdString = useParams()['id'] ?? '';
    if (!isNumeric(equipmentIdString))
        navigate(-1);

    const equipmentId = Number.parseInt(equipmentIdString);

    async function getEquipment() {
        try {
            setLoading(true);
            let loadedEquipment = await equipmentService.getOne(equipmentId);
            let loadedParams = await equipmentService.getAllParams(equipmentId);
            setEquipment(loadedEquipment);
            setEquipmentParams(loadedParams);
        } catch (e) {
            setAlert(errorHandler.handleError(e))
        } finally {
            setLoading(false);
        }
    }

    async function modifyEquipment() {
        try {
            setLoading(true);
            await equipmentService.modify(
                equipmentId,
                {
                    id: equipment.id,
                    name: equipment.name,
                    ownerId: equipment.owner?.id,
                    parameters: equipmentParams.map((param) => ({
                        attributeId: param.attribute?.id,
                        value: param.value
                    }))
                });
            setAlert({
                color: 'success',
                message: (
                    <>
                        <Typography fontWeight='bolder'>
                            Изменения успешно сохранены
                        </Typography>
                        <Typography fontWeight='bolder'>Индентификатор инвентаря:
                            <strong style={{
                                fontSize: '2em',
                                padding: '0.3em',
                                borderRadius: '0.3em',
                                backgroundColor: 'lightgray'
                            }}
                            >
                                {equipmentId}
                            </strong>
                        </Typography>
                    </>
                )
            })
        } catch (e) {
            setAlert(errorHandler.handleError(e));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getEquipment()
    }, [])

    return (
        <Stack
            spacing={2}
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
        >
            {alert && <Alert severity={alert.color}>{alert.message}</Alert>}
            <Typography color="inherit" variant='h5'>
                Редактирование оборудования
            </Typography>
            <EquipmentModificationComponent
                equipment={equipment}
                setEquipment={setEquipment}
                loading={loading}
            />
            {equipment.id &&
                <EquipmentParamsModificationComponent
                    params={equipmentParams}
                    setParams={setEquipmentParams}/>
            }
            <ButtonGroup>
                <Button onClick={() => navigate(-1)}>Отмена</Button>
                <Button variant='contained' onClick={modifyEquipment}>Сохранить</Button>
            </ButtonGroup>

        </Stack>
    )
}


export const EquipmentCreationPage = () => {
    const [equipment, setEquipment] = useState<Equipment>({})
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertInfo>();
    const navigate = useNavigate();

    async function createEquipment() {
        try {
            setLoading(true);
            let createdEquipment = await equipmentService.create({
                id: equipment.id,
                name: equipment.name
            });
            navigate(`/equipments/${createdEquipment.id}`)
        } catch (e) {
            errorHandler.handleError(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Stack
            spacing={2}
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
        >
            <Typography color="inherit" variant='h5'>
                Регистрация оборудования
            </Typography>
            <EquipmentModificationComponent
                equipment={equipment}
                setEquipment={setEquipment}
                loading={loading}
            />
            <ButtonGroup>
                <Button onClick={() => navigate(-1)}>Отмена</Button>
                <Button variant='contained' onClick={createEquipment}>Создать</Button>
            </ButtonGroup>
        </Stack>
    )
}

const EquipmentModificationComponent = (props: {
    equipment: Equipment,
    setEquipment: (equipment: Equipment) => any,
    loading: boolean
}) => {
    let {equipment, setEquipment, loading} = props;
    return (
        <Stack spacing={2} minWidth={500}>
            <TextField
                fullWidth
                variant='standard'
                disabled={loading}
                error={!!equipment.name && isEmpty(equipment.name)}
                label='Название'
                value={equipment.name ?? ''}
                onChange={event =>
                    setEquipment({
                        ...equipment,
                        name: event.target.value
                    })}/>
            <ObjectField
                label='Владелец'
                optionLabel={obj => (!obj.inn || !obj.name) ? '' : `${obj.inn} --- ${obj.name}`}
                onChange={obj =>
                    setEquipment({
                        ...equipment,
                        owner: obj
                    })
                }
                value={equipment.owner ?? {}}
                getterPaged={textValue => organizationService.searchPaged(textValue, {page: 0, size: 25})}
            />
        </Stack>
    )
}

const EquipmentParamsModificationComponent = (
    props: {
        params: EquipmentParameter[],
        setParams: (params: EquipmentParameter[]) => any
    }
) => {
    let {params, setParams} = props;

    function updateParams(index: number, attribute?: EquipmentAttribute, value?: string) {
        let cloneParams = [...params];
        cloneParams[index].attribute = attribute;
        cloneParams[index].value = value;
        setParams(cloneParams);
    }

    return (
        <Stack minWidth={500} direction='column'>
            {params.map((param, index) =>
                <Grid padding={1} container spacing={2} key={index} sx={{width: '100%'}}>
                    <Grid item xs={7}>
                        <ObjectField
                            placeholder='Аттрибут'
                            value={param.attribute}
                            onChange={attr => updateParams(index, attr, param.value)}
                            getter={equipmentService.getAllAttributes}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant='standard'
                            value={param.value}
                            onChange={event =>
                                updateParams(index, param.attribute, event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            size='small'
                            color='error'
                            onClick={() => setParams(params.filter(p => p !== param))}
                        >
                            <MdDelete/>
                        </IconButton>
                    </Grid>
                </Grid>
            )}
            <Button
                color='success'
                onClick={() => setParams([...params, {}])}
            >
                <MdAdd/>
            </Button>
        </Stack>
    )
}
