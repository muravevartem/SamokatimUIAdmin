import React, {useState} from "react";
import {Layout, Menu, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import {MdBikeScooter, MdMenu} from "react-icons/md";
import {Content} from "antd/es/layout/layout";
import {Outlet, useNavigate} from "react-router-dom";
import {BiMapAlt, BiUser} from "react-icons/bi";
import {HiUserGroup} from "react-icons/hi";

export const Root = () => {
    const [collapsed, setCollapsed] = useState(true);

    let {
        token: {
            colorBgContainer
        },
    } = theme.useToken();
    let navigate = useNavigate();

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
                    items={[
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
                    ]}
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
