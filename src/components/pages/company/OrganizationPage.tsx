import React from "react";
import {Box, Chip, Fab, IconButton, Stack} from "@mui/material";
import {GridColDef} from "@mui/x-data-grid";
import {organizationService} from "../../../service/OrganizationService";
import {MdAdd, MdEdit} from "react-icons/md";
import {beautifulTel} from "../../custom/Components";
import {ObjectTable} from "../../custom/ObjectTable";


const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'name',
        headerName: 'Название',
        minWidth: 250,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'inn',
        headerName: 'ИНН',
        minWidth: 150,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'email',
        headerName: 'E-Mail',
        minWidth: 300,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'tel',
        headerName: 'Номер телефона',
        minWidth: 200,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center',
        valueGetter: params => beautifulTel(params.value)
    },
    {
        field: 'status',
        headerName: 'Статус',
        headerAlign: 'center',
        align: 'center',
        renderCell: params => {
            switch (params.value) {
                case 'APPROVED': {
                    return <Chip
                        size='small'
                        color='success'
                        label='Подтвержедено'
                    />
                }
                case 'PENDING': {
                    return <Chip
                        size='small'
                        color='warning'
                        label='Ожидает'
                    />
                }
                case 'DENIED': {
                    return <Chip
                        size='small'
                        color='error'
                        label='Отказ'
                    />
                }
                default: {
                    return <Chip
                        size='small'
                        color='info'
                        label='Неизвестно'
                    />
                }
            }
        }
    },
    {
        field: 'k',
        headerName: '',
        headerAlign: 'center',
        renderCell: params => (
            <IconButton
                size='small'
                href={`/organizations/${params.id}`}>
                <MdEdit/>
            </IconButton>
        )
    }
];

export const OrganizationPage = () => {
    return (
        <Stack justifyContent={'center'} alignItems={'center'}>
            <Stack maxWidth={1200} position={'relative'}>
                <Box position='fixed' right={10} bottom={10}>
                    <Fab
                        size='small'
                        href='/organizations/new'
                        color='primary'
                    >
                        <MdAdd/>
                    </Fab>
                </Box>
                <ObjectTable
                    columns={columns}
                    getter={organizationService.getAll}
                />
            </Stack>
        </Stack>
    )
}


