import React, {useEffect, useState} from "react";
import {App, Form, Input, Select} from "antd";
import $api from "../../config";
import {CompanyType} from "../../models/companies";
import {AxiosError} from "axios";


export const CompanyModPage = () => {

    const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    let {notification} = App.useApp();

    useEffect(() => {
        (async () => {
            try {
                setLoading(false);
                let response = await $api.get<CompanyType[]>('/v1/handbook/dictionaries/organization-types');
                let companyTypes = response.data;
                setCompanyTypes(companyTypes)
            } catch (e) {
                if (e instanceof AxiosError) {
                    notification.error({
                        key: 'organization-types-error',
                        message: "Ошибка загрузки типов организации"
                    })
                }
            } finally {
                setLoading(true)
            }
        })()
    }, [])

    return (
        <div style={{padding: 10}}>
            <Form>
                <Form.Item label='Тип организации'>
                    <Select options={
                        companyTypes.map(type => {
                            return {value: type.id, label: type.name}
                        })
                    }
                            loading={loading}/>
                </Form.Item>
                <Form.Item label='ИНН'
                           rules={[
                               {
                                   required: true,
                                   message: 'Укажите ИНН'
                               }
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='Деятельность'>
                    <Select mode='multiple' options={[]} loading={loading}/>
                </Form.Item>
            </Form>
        </div>
    )
}
