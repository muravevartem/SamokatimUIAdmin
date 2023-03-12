import {Organization} from "./organizations";

export enum EquipmentStatus {
    FREE,
    BUSY,
    MAINTENANCE
}

export enum EquipmentType {
    BICYCLE,
    BICYCLE_EL,
    SCOOTER,
    SCOOTER_EL
}

export function beautifyType(type?: EquipmentType) {
    switch (type) {
        case EquipmentType.BICYCLE:
            return "Велосипед"
        case EquipmentType.BICYCLE_EL:
            return "Электровелосипед"
        case EquipmentType.SCOOTER:
            return "Самокат"
        case EquipmentType.SCOOTER_EL:
            return "Электросамокат"
        default:
            return "Неизвестно"
    }
}

export function beautify(status: EquipmentStatus) {
    switch (status) {
        case EquipmentStatus.FREE:
            return 'Свободен';
        case EquipmentStatus.BUSY:
            return 'Используется';
        case EquipmentStatus.MAINTENANCE:
            return 'На обслуживании';
    }
}

export type Equipment = {
    id?: number,
    name?: string,
    owner?: Organization
}

export type EquipmentAttribute = {
    id?: number,
    name?: string
}

export type EquipmentParameter = {
    id?: number,
    attribute?: EquipmentAttribute,
    value?: string
}

export type EquipmentAttributeRequest = {
    attributeId?: number,
    value?: string
}

export type EquipmentRequest = {
    id?: number,
    name?: string,
    ownerId?: number,
    parameters?: EquipmentAttributeRequest[]
}
