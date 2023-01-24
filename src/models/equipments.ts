export enum EquipmentStatus {
    FREE,
    BUSY,
    MAINTENANCE
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
