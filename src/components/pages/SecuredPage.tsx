import React, {ReactElement} from "react";
import {Role} from "../../models/roles";
import {roleService} from "../../services/RoleService";
import {useNavigate} from "react-router-dom";
import {authService} from "../../services/AuthService";

type SecuredPageProps = {
    roles: Role[],
    children: ReactElement
}


export const SecuredPage = (props: SecuredPageProps) => {
    let navigate = useNavigate();

    let currentRoles = authService.getCurrentRoles();

    if (!authService.isAuthenticated())
        navigate('/login')

    if (!props.roles.some(value => currentRoles.includes(value)))
        navigate('/access-denied')

    return (
        <>
            {props.children}
        </>
    )
}
