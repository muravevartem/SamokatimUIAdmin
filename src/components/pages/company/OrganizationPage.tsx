import React, {useEffect, useState} from "react";
import {Alert, Chip, IconButton, Stack} from "@mui/material";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import {emptyPage, Page} from "../../../model/util";
import {Organization} from "../../../model/organizations";
import {organizationService} from "../../../service/OrganizationService";
import {AlertInfo, errorHandler} from "../../../error/ErrorHandler";
import {MdEdit, MdError} from "react-icons/md";
import {RoutedBreadcrumbs} from "../../../routes";
import {beautifulTel} from "../../custom/Components";
import {OrganizationApprovingComponent} from "./OrganizationModPage";


export const OrganizationPage = () => {
    const [orgs, setOrgs] = useState<Page<Organization>>(emptyPage());
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertInfo>()
    const [approveId, setApproveId] = useState<number | string>();
    const [pagination, setPagination] = useState<GridPaginationModel>({
        pageSize: 30,
        page: 0
    })

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
                            onClick={() => setApproveId(params.id)}
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
    ]

    async function getOrgs() {
        try {
            setLoading(true);
            let orgPage = await organizationService.getAll({
                size: pagination.pageSize,
                page: pagination.page
            });
            setOrgs(orgPage);
        } catch (e) {
            setAlert(errorHandler.handleError(e))
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrgs()
    }, [approveId, pagination])

    return (
        <Stack
            spacing={2}
            padding={5}
        >
            {alert && <Alert icon={<MdError/>} color={alert?.color}>{alert?.message}</Alert>}
            <RoutedBreadcrumbs/>
            <Stack
                spacing={2}
                justifyContent='center'
                alignItems='center'
            >
                <DataGrid
                    autoHeight
                    rowCount={orgs.totalElements}
                    paginationMode='server'
                    disableRowSelectionOnClick
                    disableColumnSelector
                    rows={orgs.content ?? []}
                    columns={columns}
                    onPaginationModelChange={setPagination}
                    paginationModel={pagination}
                    pageSizeOptions={[2, 30, 50]}
                    loading={loading}
                />
            </Stack>
            {approveId &&
                <OrganizationApprovingComponent
                    org={orgs.content.filter(x => x.id === approveId)[0]}
                    open={true}
                    onClose={() => setApproveId(undefined)}
                />
            }
        </Stack>

    )
}


