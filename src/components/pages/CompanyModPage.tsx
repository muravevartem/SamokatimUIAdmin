import React, {useEffect, useState} from "react";
import {App} from "antd";
import {Company, CompanyType} from "../../models/companies";
import {AxiosError} from "axios";
import {companyService} from "../../services/CompanyService";
import {errorHandler} from "../../error/ErrorHandler";
import {FormGroup, MenuItem, Select, Stack, TextField} from "@mui/material";


export const CompanyModPage = () => {

    const [company, setCompany] = useState<Company>({});
    const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    let {notification} = App.useApp();

    useEffect(() => {
        (async () => {
            try {
                setLoading(false);
                let types = await companyService.getTypes();
                setCompanyTypes(types)
            } catch (e) {
                if (e instanceof AxiosError) {
                    notification.error(errorHandler.handleAxiosError(e))
                }
            } finally {
                setLoading(true)
            }
        })()
    }, [])

    return (
        <div style={{padding: 10}}>
            {!loading &&
                <FormGroup>
                    <Stack spacing={4}>
                        <TextField error={false}
                                   label='ИНН'
                                   value={company.inn}
                                   disabled={loading}
                                   onChange={event =>
                                       setCompany({
                                           ...company,
                                           inn: event.target.value
                                       })}/>
                        <Select error={false}
                                label='Тип организации'
                                placeholder='Тип организации'
                                value={company.inn}
                                disabled={loading}
                                onChange={event =>
                                    setCompany({
                                        ...company,
                                        type: {
                                            id: Number.parseInt(event.target.value)
                                        }
                                    })}>
                            {companyTypes.map(type =>
                                <MenuItem value={type.id}>{type.name}</MenuItem>
                            )}
                        </Select>
                    </Stack>
                </FormGroup>
            }
        </div>
    )
}

// <FormGroup>
//     <FormControlLabel
//         control={
//             <Switch
//                 checked={auth}
//                 onChange={handleChange}
//                 aria-label="login switch"
//             />
//         }
//         label={auth ? 'Logout' : 'Login'}
//     />
// </FormGroup>
