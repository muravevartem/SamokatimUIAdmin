import {Gender, User} from "../model/users";
import moment from "moment/moment";
import {Role} from "../model/roles";

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

    getCurrentRoles(): Role[] {
        return this.roles;
    }
}

export const authService = new AuthService();
