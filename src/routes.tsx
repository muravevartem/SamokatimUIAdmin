import {createBrowserRouter} from "react-router-dom";
import {Root} from "./components/pages/Root";
import {MapPage} from "./components/pages/MapPage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/map',
                element: <MapPage/>
            }
        ]
    }
])
