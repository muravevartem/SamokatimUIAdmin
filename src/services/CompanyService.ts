import {Company, CompanyType} from "../models/companies";
import moment from "moment";
import $api from "../config";

export class CompanyService {

    getCurrentCompany(): Company {
        return {
            id: 12,
            name: 'ИП "Помидорка"',
            description: 'Прокат велосипедов и прочих аксессуаров',
            registrationDate: moment()
        }
    }

    async getTypes(): Promise<CompanyType[]> {
        let response = await $api.get<CompanyType[]>('/v1/handbook/dictionaries/organization-types');
        return response.data;
    }

    async getAll(): Promise<Company[]> {
        return [];
    }

}

export const companyService = new CompanyService();
