import React, {useEffect} from "react";
import {Space, Tag} from "antd";
import {companyService} from "../../services/CompanyService";
import Typography from "antd/es/typography/Typography";
import {useKeycloak} from "@react-keycloak/web";
import {useNavigate} from "react-router-dom";


export const ProfileCompanyPage = () => {
    let {keycloak, initialized} = useKeycloak();
    let navigate = useNavigate();

    function getCurrentRoles(): string[] {
        let ra = keycloak.tokenParsed?.resource_access ?? {'smkt': {roles: []}};
        return ra['smkt'].roles
    }

    useEffect(() => {
            if (!keycloak.authenticated) {
                navigate('/')
            }
        }, []
    )


    let company = companyService.getCurrentCompany();

    function getEmail():string {
        return keycloak.tokenParsed?.email;
    }


    return (
        <Space
            style={{
                padding: 50
            }}
            direction='vertical'
        >
            <Typography>
                {getEmail()}
            </Typography>
            <span style={{fontWeight: 'bolder'}}>Роль: </span>
            <Space>{getCurrentRoles().map(role => <Tag key={role}>{role}</Tag>)}</Space>
        </Space>
    )
}
