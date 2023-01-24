import React from "react";
import {Typography} from "antd";
import {authService} from "../../services/AuthService";
import Title from "antd/es/typography/Title";
import {MapComponent} from "../MapComponent";

export const MapPage = () => {
    let currentUser = authService.getCurrentUser();

    return (
        <>
            <MapComponent/>
        </>

    )
}
