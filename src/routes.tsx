import {createBrowserRouter, createRoutesFromElements, redirect, Route, useLocation} from "react-router-dom";
import {Root} from "./components/pages/Root";
import {MapPage} from "./components/pages/MapPage";
import {ProfileCompanyPage} from "./components/pages/ProfileCompanyPage";
import {ErrorPage} from "./components/pages/ErrorPage";
import {EquipmentPage} from "./components/pages/EquipmentPage";
import {EquipmentModPage} from "./components/pages/EquipmentModPage";
import {OrganizationModificationPage, OrganizationModPage} from "./components/pages/company/OrganizationModPage";
import React from "react";
import {OrganizationPage} from "./components/pages/company/OrganizationPage";
import {Breadcrumbs, Link, Typography} from "@mui/material";


export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<Root/>} errorElement={<ErrorPage/>}>
            <Route path='' loader={() => redirect('/map')}/>
            <Route path='map' element={<MapPage/>}/>
            <Route path='lk' element={<ProfileCompanyPage/>}/>
            <Route path='organizations'>
                <Route path='' element={<OrganizationPage/>}/>
                <Route path='new' element={<OrganizationModPage/>}/>
                <Route path=':orgId' element={<OrganizationModificationPage/>}/>
            </Route>
            <Route path='equipments'>
                <Route path='' element={<EquipmentPage/>}/>
                <Route path=':equipmentId' element={<EquipmentModPage/>}/>
                <Route path='new' element={<EquipmentModPage/>}/>
            </Route>
        </Route>
    )
)

type PathType = {
    [key: string]: string;
}
export const paths: PathType = {
    organizations: 'Организации'
}


export function RoutedBreadcrumbs() {
    let location = useLocation();
    const pathList = location.pathname.split('/')
    return (
        <Breadcrumbs separator='/'>

            {pathList.map((value, index) => {
                const first = index === 0;
                const last = index === pathList.length - 1;
                const to = `/${pathList.slice(0, index + 1).join('/')}`

                if (last) {
                    return (
                        <Typography key={index}>
                            {paths[value]}
                        </Typography>
                    )
                }

                if (first) {
                    return (
                        <Link href='/' key={index}>
                            Главная
                        </Link>
                    )
                }

                return <Link href={to} key={index}>
                    {paths[value]}
                </Link>
            })

            }
        </Breadcrumbs>
    )
}
