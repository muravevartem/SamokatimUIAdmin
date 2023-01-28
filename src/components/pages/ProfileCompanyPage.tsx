import React from "react";
import {Space, Tooltip} from "antd";
import Title from "antd/es/typography/Title";
import {companyService} from "../../services/CompanyService";
import Typography from "antd/es/typography/Typography";

export const ProfileCompanyPage = () => {
    let company = companyService.getCurrentCompany();
    return (
        <Space
            style={{
                padding: 50
            }}
            direction='vertical'
        >
            <Title>
                {company.name}
            </Title>
            <Typography>
                {company.description}
            </Typography>
            <Tooltip title={company.registrationDate?.fromNow()}>
                <span style={{fontWeight: 'bolder'}}>Зарегистрирован: </span>
                <span>
                    {company.registrationDate?.format('LL')}
                </span>
            </Tooltip>
        </Space>
    )
}
