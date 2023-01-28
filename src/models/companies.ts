import {Moment} from "moment";

export type Company = {
    id?: number,
    name?: string,
    description?: string,
    registrationDate?: Moment,
    inn?: string,

}
