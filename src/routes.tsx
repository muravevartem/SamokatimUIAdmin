import {createBrowserRouter, createRoutesFromElements, redirect, Route} from "react-router-dom";
import {Root} from "./components/pages/Root";
import {MapPage} from "./components/pages/MapPage";
import {ProfileCompanyPage} from "./components/pages/ProfileCompanyPage";
import {ErrorPage} from "./components/pages/ErrorPage";
import {EquipmentPage} from "./components/pages/EquipmentPage";
import {EquipmentModPage} from "./components/pages/EquipmentModPage";
import {OrganizationRegistrationPage} from "./components/pages/company/OrganizationRegistrationPage";
import React from "react";


export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<Root/>} errorElement={<ErrorPage/>}>
            <Route path='' loader={() => redirect('/map')}/>
            <Route path='map' element={<MapPage/>}/>
            <Route path='lk' element={<ProfileCompanyPage/>}/>
            <Route path='organizations'>
                <Route path='new' element={<OrganizationRegistrationPage/>}/>
            </Route>
            <Route path='equipments'>
                <Route path='' element={<EquipmentPage/>}/>
                <Route path=':equipmentId' element={<EquipmentModPage/>}/>
                <Route path='new' element={<EquipmentModPage/>}/>
            </Route>
        </Route>
    )
)
