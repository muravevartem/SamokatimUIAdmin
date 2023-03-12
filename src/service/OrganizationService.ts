import {Organization} from "../model/organizations";
import {Page, Pageable} from "../model/util"
import $api from "../config";

export class CompanyService {

    private url = `/api/v1/admin/organizations`;

    async getAll(pageable: Pageable): Promise<Page<Organization>> {
        let response =
            await $api.get<Page<Organization>>(`${this.url}?page=${pageable.page}&size=${pageable.size}`);
        return response.data;
    }

    async searchPaged(keyword: string, pageable: Pageable): Promise<Page<Organization>> {
        let response =
            await $api.get<Page<Organization>>(`${this.url}?search=${keyword}&page=${pageable.page}&size=${pageable.size}`);
        return response.data;
    }

    async getOne(orgId: number): Promise<Organization> {
        let response =
            await $api.get<Organization>(`${this.url}/${orgId}`);
        return response.data;
    }

    async create(org: Organization): Promise<Organization> {
        let response =
            await $api.post<Organization>(`${this.url}`, org);
        return response.data;
    }

    async modify(orgId: number, org: Organization): Promise<Organization> {
        let response =
            await $api.put<Organization>(`${this.url}/${orgId}`, org);
        return response.data;
    }

    async approve(orgId: number): Promise<Organization> {
        let response =
            await $api.put<Organization>(`${this.url}/${orgId}/approve`);
        return response.data;
    }

    async delete(orgId: number): Promise<null> {
        return await $api.delete(`${this.url}/${orgId}`)
    }
}

export const organizationService = new CompanyService();
