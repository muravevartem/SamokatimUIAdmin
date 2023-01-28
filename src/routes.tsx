import {createBrowserRouter, createRoutesFromElements, redirect, Route} from "react-router-dom";
import {Root} from "./components/pages/Root";
import {MapPage} from "./components/pages/MapPage";
import {ProfileCompanyPage} from "./components/pages/ProfileCompanyPage";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
            <Route path='/' loader={x => redirect('/map')}/>
            <Route path='/map' element={<MapPage/>}/>
            <Route path='/lk' element={<ProfileCompanyPage/>}/>
        </Route>
    )
)
