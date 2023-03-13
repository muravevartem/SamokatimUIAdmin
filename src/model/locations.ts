import {Moment} from "moment";
import {LatLng} from "leaflet";


export type EquipmentGeoPoint = {
    transportId: number,
    lat: number,
    lng: number,
}

export type EquipmentGeoTrack = {
    id: string
    transportId: number,
    lat: number,
    lng: number,
    addedAt: Moment
}

export type MapViewRequest = {
    northEast: LatLng,
    southWest: LatLng
}
