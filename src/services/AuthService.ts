import {Gender, User} from "../models/users";
import moment from "moment/moment";
import {Role} from "../models/roles";
import {useKeycloak} from "@react-keycloak/web";

export class AuthService {
    roles: Role[] = [
        Role.USER
    ]
    currentUser: User | null = {
        id: 12,
        firstName: 'Муравьев',
        lastName: 'Артём',
        gender: Gender.MALE,
        birthDate: moment('2013-02-08')
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    isAuthenticated(): boolean {
        return this.currentUser !== null
    }


    private ACCESS_TOKEN = 'access_token';

    saveAccessToken(token: string) {
        localStorage.setItem(this.ACCESS_TOKEN, token);
    }

    getAccessToken(): string {
        return localStorage.getItem(this.ACCESS_TOKEN)?? 'DUMMY';
    }

}

export const authService = new AuthService();
