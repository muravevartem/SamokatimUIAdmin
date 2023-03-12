import {Organization} from "../model/organizations";
import {Page, Pageable} from "../model/util"
import $api from "../config";

export class CompanyService {

    private static readonly BASE_URL = `/api/v1/admin/organizations`;
    private static readonly FNS_URL = `/api/v1/fns/organizations`;

    async getAll(pageable: Pageable): Promise<Page<Organization>> {
        let response =
            await $api.get<Page<Organization>>(`${CompanyService.BASE_URL}?page=${pageable.page}&size=${pageable.size}`);
        return response.data;
    }

    async searchPaged(keyword: string, pageable: Pageable): Promise<Page<Organization>> {
        let response =
            await $api.get<Page<Organization>>(`${CompanyService.BASE_URL}?search=${keyword}&page=${pageable.page}&size=${pageable.size}`);
        return response.data;
    }

    async searchByInn(inn: string): Promise<Organization> {
        let response =
            await $api.get<Organization>(`${CompanyService.FNS_URL}?inn=${inn}`);
        return response.data;
    }

    async getOne(orgId: number): Promise<Organization> {
        let response =
            await $api.get<Organization>(`${CompanyService.BASE_URL}/${orgId}`);
        return response.data;
    }

    async create(org: Organization): Promise<Organization> {
        let response =
            await $api.post<Organization>(`${CompanyService.BASE_URL}`, org);
        return response.data;
    }

    async modify(orgId: number, org: Organization): Promise<Organization> {
        let response =
            await $api.put<Organization>(`${CompanyService.BASE_URL}/${orgId}`, org);
        return response.data;
    }

    async approve(orgId: number): Promise<Organization> {
        let response =
            await $api.put<Organization>(`${CompanyService.BASE_URL}/${orgId}/approve`);
        return response.data;
    }

    async delete(orgId: number): Promise<null> {
        return await $api.delete(`${CompanyService.BASE_URL}/${orgId}`)
    }
}

export const organizationService = new CompanyService();
