import React, {useState} from "react";
import {MdAccountCircle, MdMenu} from "react-icons/md";
import {Outlet, useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Button, Drawer,
    FormControlLabel,
    FormGroup,
    IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Menu,
    MenuItem,
    Stack,
    Switch,
    Toolbar,
    Typography
} from "@mui/material";
import {BiCycling, BiGroup, BiHome, BiMap} from "react-icons/bi";

export const Root = () => {
    const [collapsed, setCollapsed] = useState(true);

    let navigate = useNavigate();

    return (
        // <Layout
        //     style={{
        //         minHeight: '100vh'
        //     }}>
        //     <Sider
        //         trigger={<MdMenu/>}
        //         collapsible
        //         collapsed={collapsed}
        //         onCollapse={(collapsed) => setCollapsed(collapsed)}
        //         breakpoint="xl"
        //         collapsedWidth='50'
        //     >
        //
        //         <Menu
        //             theme='dark'
        //             mode='inline'
        //             items={[
        //                 {
        //                     key: 0,
        //                     icon: <BiUser/>,
        //                     label: 'Личный кабинет',
        //                     onClick: () => navigate('/lk')
        //                 },
        //                 {
        //                     key: 1,
        //                     icon: <BiMapAlt/>,
        //                     label: 'Карта',
        //                     onClick: () => navigate('/map')
        //                 },
        //                 {
        //                     key: 2,
        //                     icon: <MdBikeScooter/>,
        //                     label: 'Оборудование',
        //                     onClick: () => navigate('/equipments')
        //                 },
        //                 {
        //                     key: 3,
        //                     icon: <HiUserGroup/>,
        //                     label: 'Клиенты',
        //                     onClick: () => navigate('/clients')
        //                 },
        //                 {
        //                     key: 4,
        //                     icon: <BiGroup/>,
        //                     label: 'Организации',
        //                     onClick: () => navigate('/companies')
        //                 }
        //             ]}
        //         />
        //     </Sider>
        //     <Layout>
        //         <Content
        //             style={{
        //                 overflow: "auto",
        //                 minHeight: '100vh'
        //             }}>
        //             <Outlet/>
        //         </Content>
        //     </Layout>
        // </Layout>
        <Stack>
            <MenuAppBar/>
            <Outlet/>
        </Stack>
    )

}

type ApplicationMenuProps = {
    isOpen: boolean,
    onClose: () => any
}

export function ApplicationMenu(props: ApplicationMenuProps) {
    const navigate = useNavigate();
    return (
        <Drawer
            open={props.isOpen}
            onClose={props.onClose}
        >
            <List>
                <ListItem>
                    <ListItemButton onClick={props.onClose}>
                        <ListItemIcon>
                            <BiHome/>
                        </ListItemIcon>
                        <ListItemText primary='Самокатим'
                                      secondary='Панель администратора'/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href='/map'>
                        <ListItemIcon>
                            <BiMap/>
                        </ListItemIcon>
                        <ListItemText primary='Карта'/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href='/companies'>
                        <ListItemIcon>
                            <BiGroup/>
                        </ListItemIcon>
                        <ListItemText primary='Организации'
                                      secondary='Список организаций проката'/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href='/equipments'>
                        <ListItemIcon>
                            <BiCycling/>
                        </ListItemIcon>
                        <ListItemText primary='Инвентарь'
                                      secondary='Список прокатного инвентаря'/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default function MenuAppBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isOpenMenu, setOpenMenu] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{flexGrow: 1}}>
            {/*<FormGroup>*/}
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Switch*/}
            {/*                checked={auth}*/}
            {/*                onChange={handleChange}*/}
            {/*                aria-label="login switch"*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label={auth ? 'Logout' : 'Login'}*/}
            {/*    />*/}
            {/*</FormGroup>*/}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => setOpenMenu(true)}
                    >
                        <MdMenu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Самокатим
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MdAccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!auth && (
                        <div>
                            <Button variant="contained" color='secondary'>Войти</Button>
                        </div>
                    )

                    }
                    <ApplicationMenu isOpen={isOpenMenu} onClose={()=>setOpenMenu(false)}/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
