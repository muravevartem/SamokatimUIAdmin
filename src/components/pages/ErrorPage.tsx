import React from "react";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";


export const ErrorPage = () => {
    let navigate = useNavigate();
    return (
        <div style={{
            height: '100vh',
            width: '100%'
        }}
        >
            <Result status='404'
                    title="Страница не найдена"
                    extra={<Button type='primary' onClick={() => navigate(-1)}>Вернуться назад</Button>}
            />
        </div>
    )
}
