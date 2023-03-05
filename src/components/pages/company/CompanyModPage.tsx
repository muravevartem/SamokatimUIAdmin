import React, {useEffect, useState} from "react";
import {App} from "antd";
import {Company, CompanyType} from "../../../models/companies";
import {AxiosError} from "axios";
import {companyService} from "../../../services/CompanyService";
import {errorHandler} from "../../../error/ErrorHandler";
import {
    Autocomplete,
    Button,
    ButtonGroup,
    FormGroup,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";


export const CompanyModPage = () => {

    const [company, setCompany] = useState<Company>({});
    const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    let {notification} = App.useApp();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                let types = await companyService.getTypes();
                setCompanyTypes(types)
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
        <div style={{padding: 10}}>
            <Stack minHeight='100vh'
                   spacing={4}
                   alignItems='center'
                   justifyContent='center'>
                <Typography color="inherit" variant='h5'>
                    Регистрация организации
                </Typography>
                <TextField error={false}
                           label='ИНН'
                           value={company.inn}
                           disabled={loading}
                           onChange={event =>
                               setCompany({
                                   ...company,
                                   inn: event.target.value
                               })}/>
                <Autocomplete
                    renderInput={(params) =>
                        <TextField {...params} label="Тип организации" />}
                    options={companyTypes}
                    getOptionLabel={o => o.name??'Unknown'}
                />
                <ButtonGroup>
                    <Button onClick={() => navigate(-1)}>Отмена</Button>
                    <Button variant='contained'>Готово</Button>
                </ButtonGroup>
            </Stack>
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
