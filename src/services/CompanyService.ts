import {Company, CompanyType} from "../models/companies";
import moment from "moment";
import $api from "../config";
import {Page} from "../models/util";

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

    async getAll(page: number, size: number): Promise<Page<Company>> {
        return {
            content: [{
                id: 1,
                name: 'ИП "Помидорка"'
            }],
            page: 1,
            size: 30
        };
    }

    async getOne(companyId: number): Promise<Company> {
        return {
            name: 'Test-company'
        }
    }

}

export const companyService = new CompanyService();
