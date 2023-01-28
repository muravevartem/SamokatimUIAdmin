import {Moment} from "moment";

export type TransportTimePoint = {
    id: string,
    transportId: number,
    lat: number,
    lng: number,
    timestamp: Moment

}
