import React from "react";
import Title from "antd/es/typography/Title";
import {Space} from "antd";


export const ErrorPage = () => {
    return (
        <div
            style={{
                backgroundImage: 'url(./error-bg.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
            <Space
                direction='vertical'
                align='center'
                style={{
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,0.68)'
                }}>
                <Title level={1}>Что-то пошло не так...</Title>
            </Space>
        </div>
    )
}
