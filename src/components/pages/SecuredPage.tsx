import React, {ReactElement} from "react";
import {Role} from "../../models/roles";
import {roleService} from "../../services/RoleService";
import {useNavigate} from "react-router-dom";
import {authService} from "../../services/AuthService";
import {useKeycloak} from "@react-keycloak/web";

type SecuredPageProps = {
    children: ReactElement
}


export const SecuredPage = (props: SecuredPageProps) => {
    let navigate = useNavigate();

    const {keycloak, initialized} = useKeycloak();

    if (!keycloak.authenticated)
        return <></>

    return (
        <>
            {props.children}
        </>
    )
}
