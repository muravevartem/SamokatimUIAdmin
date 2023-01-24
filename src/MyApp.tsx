import React from "react";
import {App, ConfigProvider} from "antd";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import ruRu from 'antd/locale/ru_RU';

export const MyApp = () => (
    <ConfigProvider locale={ruRu}>
        <App>
            <RouterProvider router={routes}/>
        </App>
    </ConfigProvider>

)
