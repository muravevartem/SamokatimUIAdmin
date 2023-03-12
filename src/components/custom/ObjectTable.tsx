import React, {useEffect, useState} from "react";
import {emptyPage, Page, Pageable} from "../../model/util";
import {AlertInfo, errorHandler} from "../../error/ErrorHandler";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import {Alert, Stack} from "@mui/material";
import {MdError} from "react-icons/md";
import {RoutedBreadcrumbs} from "../../routes";

export function ObjectTable<T>(props: {
    columns: GridColDef[],
    getter: (pageable: Pageable) => Promise<Page<T>>
}) {
    const [content, setContent] = useState<Page<T>>(emptyPage());
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertInfo>()
    const [pagination, setPagination] = useState<GridPaginationModel>({
        pageSize: 30,
        page: 0
    })

    async function getContent() {
        try {
            setLoading(true);
            let loadedContent = await props.getter({
                size: pagination.pageSize,
                page: pagination.page
            });
            setContent(loadedContent);
        } catch (e) {
            setAlert(errorHandler.handleError(e))
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getContent()
    }, [pagination])

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
                    rowCount={content.totalElements}
                    paginationMode='server'
                    disableRowSelectionOnClick
                    disableColumnSelector
                    rows={content.content ?? []}
                    columns={props.columns.map(old => ({...old, align: 'center', headerAlign: 'center'}))}
                    onPaginationModelChange={setPagination}
                    paginationModel={pagination}
                    pageSizeOptions={[2, 30, 50]}
                    loading={loading}
                />
            </Stack>
        </Stack>

    )
}
