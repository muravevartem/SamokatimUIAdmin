import {createBrowserRouter, createRoutesFromElements, redirect, Route} from "react-router-dom";
import {Root} from "./components/pages/Root";
import {MapPage} from "./components/pages/MapPage";
import {ProfileCompanyPage} from "./components/pages/ProfileCompanyPage";
import {ErrorPage} from "./components/pages/ErrorPage";
import {EquipmentPage} from "./components/pages/EquipmentPage";
import {EquipmentModPage} from "./components/pages/EquipmentModPage";
import {CompanyModPage} from "./components/pages/CompanyModPage";


export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<Root/>} errorElement={<ErrorPage/>}>
            <Route path='' loader={() => redirect('/map')}/>
            <Route path='map' element={<MapPage/>}/>
            <Route path='lk' element={<ProfileCompanyPage/>}/>
            <Route path='companies'>
                <Route path='new' element={<CompanyModPage/>}/>
            </Route>
            <Route path='equipments'>
                <Route path='' element={<EquipmentPage/>}/>
                <Route path=':equipmentId' element={<EquipmentModPage/>}/>
                <Route path='new' element={<EquipmentModPage/>}/>
            </Route>
        </Route>
    )
)
