import {Moment} from "moment";

export enum Gender {
    MALE,
    FEMALE,
    OTHER
}

export interface User {
    id: number | null
    firstName: string | null,
    lastName: string | null,
    birthDate: Moment | null,
    gender: Gender
}
