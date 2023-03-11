import {Organization} from "../model/organizations";
import {Page, Pageable} from "../model/util"
import $api from "../config";

export class CompanyService {

    async getAll(pageable: Pageable): Promise<Page<Organization>> {
        return await $api.get(`/api/v1/admin/organizations?page=${pageable.page}&size=${pageable.size}`);
    }

    async create(org: Organization): Promise<Organization> {
        return await $api.post(`/api/v1/admin/organizations`, org);
    }

    async modify(orgId: number, org: Organization): Promise<Organization> {
        return await $api.put(`/api/v1/admin/organizations/${orgId}`, org);
    }

    async approve(orgId: number): Promise<Organization> {
        return await $api.put(`/api/v1/organizations/${orgId}/approve`)
    }

    async delete(orgId: number): Promise<null> {
        return await $api.delete(`/api/v1/organizations/${orgId}`)
    }
}

export const organizationService = new CompanyService();
