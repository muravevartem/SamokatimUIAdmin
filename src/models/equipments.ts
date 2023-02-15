import {Company} from "./companies";

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
            return "Покемон"
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
    owner?: Company,
    type?: EquipmentType
}
