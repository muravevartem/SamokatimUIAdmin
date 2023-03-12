import {Organization} from "../model/organizations";
import {Page, Pageable} from "../model/util"
import $api from "../config";

export class CompanyService {

    async getAll(pageable: Pageable): Promise<Page<Organization>> {
        let response = await $api.get<Page<Organization>>(`/api/v1/admin/organizations?page=${pageable.page}&size=${pageable.size}`);
        return response.data;
    }

    async getOne(orgId: number): Promise<Organization> {
        let response = await $api.get<Organization>(`/api/v1/admin/organizations/${orgId}`);
        return response.data;
    }

    async create(org: Organization): Promise<Organization> {
        let response = await $api.post<Organization>(`/api/v1/admin/organizations`, org);
        return response.data;
    }

    async modify(orgId: number, org: Organization): Promise<Organization> {
        let response = await $api.put<Organization>(`/api/v1/admin/organizations/${orgId}`, org);
        return response.data;
    }

    async approve(orgId: number): Promise<Organization> {
        let response = await $api.put<Organization>(`/api/v1/admin/organizations/${orgId}/approve`);
        return response.data;
    }

    async delete(orgId: number): Promise<null> {
        return await $api.delete(`/api/v1/admin/organizations/${orgId}`)
    }
}

export const organizationService = new CompanyService();
