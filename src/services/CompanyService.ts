import {Company} from "../models/companies";
import moment from "moment";

export class CompanyService {

    getCurrentCompany(): Company {
        return {
            id: 12,
            name: 'ИП "Помидорка"',
            description: 'Прокат велосипедов и прочих аксессуаров',
            registrationDate: moment()
        }
    }

}

export const companyService = new CompanyService();
