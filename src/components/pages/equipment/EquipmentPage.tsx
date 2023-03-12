import React from "react";
import {ObjectTable} from "../../custom/ObjectTable";
import {GridColDef} from "@mui/x-data-grid";
import {Box, Fab, IconButton, Stack} from "@mui/material";
import {MdAdd, MdEdit} from "react-icons/md";
import {equipmentService} from "../../../service/EquipmentService";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID'
    },
    {
        field: 'name',
        headerName: 'Наименование',
        minWidth: 300
    },
    {
        field: 'owner',
        headerName: 'Владелец',
        valueGetter: params => params.value['name'],
        minWidth: 300
    },
    {
        field: 'action',
        headerName: '',
        renderCell: params => (
            <IconButton
                href={`/equipments/${params.id}`}
                size='small'>
                <MdEdit/>
            </IconButton>
        )
    }
]

export const EquipmentPage = () => {
    return (
        <Stack justifyContent={'center'} alignItems={'center'}>
            <Stack maxWidth={1200} position={'relative'}>
                <Box position='fixed' right={10} bottom={10}>
                    <Fab
                        size='small'
                        href='/equipments/new'
                        color='primary'
                    >
                        <MdAdd/>
                    </Fab>
                </Box>
                <ObjectTable
                    columns={columns}
                    getter={equipmentService.getAll}
                />
            </Stack>
        </Stack>
    )
}
