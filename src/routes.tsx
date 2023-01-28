import {createBrowserRouter, createRoutesFromElements, redirect, Route} from "react-router-dom";
import {Root} from "./components/pages/Root";
import {MapPage} from "./components/pages/MapPage";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
            <Route path='/' loader={x => redirect('/map')}/>
            <Route path='/map' element={<MapPage/>}/>
        </Route>
    )
)
