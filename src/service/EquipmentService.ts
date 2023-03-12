import {Page, Pageable} from "../model/util";
import {Equipment, EquipmentAttribute, EquipmentParameter, EquipmentRequest} from "../model/equipments";
import $api from "../config";

export class EquipmentService {
    async getAll(pageable: Pageable): Promise<Page<Equipment>> {
        let response =
            await $api.get<Page<Equipment>>(`/api/v1/admin/equipments?page=${pageable.page}&size=${pageable.size}`);
        return response.data;
    }

    async getOne(id: number): Promise<Equipment> {
        let response =
            await $api.get<Equipment>(`/api/v1/admin/equipments/${id}`)
        return response.data;
    }

    async getAllParams(id: number): Promise<EquipmentParameter[]> {
        let response =
            await $api.get<EquipmentParameter[]>(`/api/v1/admin/equipments/${id}/params`);
        return response.data;
    }

    async getAllAttributes(keyword: string): Promise<EquipmentAttribute[]> {
        let response =
            await $api.get<EquipmentAttribute[]>(`/api/v1/dictionaries/equipment-attributes?t=${keyword}`);
        return response.data;
    }

    async create(equipment: EquipmentRequest): Promise<Equipment> {
        let response =
            await $api.post<Equipment>(`/api/v1/admin/equipments`, equipment);
        return response.data;
    }

    async modify(id: string | number, equipment: EquipmentRequest): Promise<Equipment> {
        let response =
            await $api.put<Equipment>(`/api/v1/admin/equipments/${id}`, equipment);
        return response.data;
    }

    async delete(id: string | number) {
        await $api.delete(`/api/v1/admin/equipments/${id}`);
    }


}

export const equipmentService = new EquipmentService()
