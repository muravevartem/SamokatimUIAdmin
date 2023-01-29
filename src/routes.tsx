import {createBrowserRouter, createRoutesFromElements, redirect, Route} from "react-router-dom";
import {Root} from "./components/pages/Root";
import {MapPage} from "./components/pages/MapPage";
import {ProfileCompanyPage} from "./components/pages/ProfileCompanyPage";
import {ErrorPage} from "./components/pages/ErrorPage";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>} errorElement={<ErrorPage/>}>
            <Route path='/' loader={x => redirect('/map')}/>
            <Route path='/map' element={<MapPage/>}/>
            <Route path='/lk' element={<ProfileCompanyPage/>}/>
        </Route>
    )
)
