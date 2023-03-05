import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Page} from "../../../models/util";
import {Company} from "../../../models/companies";
import {Button, Chip, Stack, Tooltip, Typography} from "@mui/material";
import moment from "moment/moment";
import {App} from "antd";
import {companyService} from "../../../services/CompanyService";
import {AxiosError} from "axios";
import {errorHandler} from "../../../error/ErrorHandler";


const gridCols: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50
    },
    {
        field: 'name',
        headerName: 'Название',
        width: 250
    },
    {
        field: 'inn',
        headerName: 'ИНН',
        width: 150
    },
    {
        field: 'type',
        headerName: 'Тип организации',
        width: 150
    },
    {
        field: 'registrationDate',
        headerName: 'Дата регистрации',
        width: 150,
        renderCell: params =>
            moment(params.value).format('LLL')
    }
]
export const CompanyPage = () => {

    const [companyPage, setCompanyPage] = useState<Page<Company>>()
    const [loading, setLoading] = useState(false);
    const {notification} = App.useApp();

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                let companyPage = await companyService.getAll(1,30);
                setCompanyPage(companyPage);
            } catch (e) {
                if (e instanceof AxiosError) {
                    notification.error(errorHandler.handleAxiosError(e))
                }
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
      <Stack spacing={4} padding={4}>
          <Stack direction='row'
                 justifyContent='space-between'
                 color="inherit">
              <Typography color="inherit" variant='h5'>
                  Список организаций
              </Typography>
              <Button variant={'outlined'}
                      disabled={loading}
                      href='/companies/new'>
                  Добавить
              </Button>
          </Stack>
          <DataGrid loading={loading}
                    columns={gridCols}
                    pageSizeOptions={[100]}
                    rows={companyPage?.content??[]}/>
      </Stack>
  )
}