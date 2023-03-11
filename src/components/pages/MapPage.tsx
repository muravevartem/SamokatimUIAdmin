import React from "react";
import {authService} from "../../service/AuthService";
import {MapComponent} from "../MapComponent";

export const MapPage = () => {
    let currentUser = authService.getCurrentUser();

    return (
        <>
            <MapComponent/>
        </>

    )
}
