import React, {useState} from "react";
import {Layout, Menu, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import {MdBikeScooter, MdMenu} from "react-icons/md";
import {Content} from "antd/es/layout/layout";
import {Outlet, useNavigate} from "react-router-dom";
import {BiLogIn, BiLogOut, BiMapAlt, BiUser} from "react-icons/bi";
import {HiUserGroup} from "react-icons/hi";
import {useKeycloak} from "@react-keycloak/web";

export const Root = () => {
    const [collapsed, setCollapsed] = useState(true);

    const {keycloak} = useKeycloak();

    let {
        token: {
            colorBgContainer
        },
    } = theme.useToken();
    let navigate = useNavigate();

    let items = [
        {
            key: 0,
            icon: <BiUser/>,
            label: 'Личный кабинет',
            onClick: () => navigate('/lk')
        },
        {
            key: 1,
            icon: <BiMapAlt/>,
            label: 'Карта',
            onClick: () => navigate('/map')
        },
        {
            key: 2,
            icon: <MdBikeScooter/>,
            label: 'Оборудование',
            onClick: () => navigate('/equipments')
        },
        {
            key: 3,
            icon: <HiUserGroup/>,
            label: 'Клиенты',
            onClick: () => navigate('/clients')
        }
    ]

    if (!keycloak.authenticated)
        items.push({
            key: 4,
            icon: <BiLogIn/>,
            label: 'Войти',
            onClick: () => keycloak.login()
        })
    else
        items.push({
            key: 4,
            icon: <BiLogOut/>,
            label: 'Выйти',
            onClick: () => keycloak.logout()
        })

    return (
        <Layout
            style={{
                minHeight: '100vh'
            }}>
            <Sider
                trigger={<MdMenu/>}
                collapsible
                collapsed={collapsed}
                onCollapse={(collapsed) => setCollapsed(collapsed)}
                breakpoint="xl"
                collapsedWidth='50'
            >

                <Menu
                    theme='dark'
                    mode='inline'
                    items={items}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        overflow: "auto",
                        minHeight: '100vh'
                    }}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )

}
