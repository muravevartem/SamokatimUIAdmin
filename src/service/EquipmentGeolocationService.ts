import {Map as LeafletMap} from "leaflet";
import {EquipmentGeoPoint, EquipmentGeoTrack, MapViewRequest} from "../model/locations";
import {$apiMonitor} from "../config";
import moment from "moment";

export class EquipmentGeolocationService {
    async getCurrentGeoPointsInMap(map: LeafletMap): Promise<EquipmentGeoPoint[]> {
        let bounds = map.getBounds();
        let northEast = bounds.getNorthEast();
        let southWest = bounds.getSouthWest();
        let request: MapViewRequest = {
            northEast: northEast,
            southWest: southWest
        }
        let response = await $apiMonitor.post<EquipmentGeoPoint[]>(`/api/v1/geo-points?actual`, request);
        return response.data;
    }

    async getTrack(equipmentId: number | string): Promise<EquipmentGeoTrack[]> {
        let end = moment().toISOString();
        let start = moment().subtract({hours: 24}).toISOString();
        let response =
            await $apiMonitor.get<EquipmentGeoTrack[]>(
                `/api/v1/tracks?tId=${equipmentId}&start=${start}&end=${end}`
            )
        return response.data;
    }
}

export const equipmentGeolocationService = new EquipmentGeolocationService();
