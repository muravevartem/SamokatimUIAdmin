import {TransportTimePoint} from "../models/locations";
import $api from "../config";

export class TrackService {
    async getTrack(transportId: number): Promise<TransportTimePoint[]> {
        let response = await $api.get<TransportTimePoint[]>(
            `/v1/track`,
            {
                params:
                    {
                        't':
                        transportId
                    }
            });
        return response.data;
    }
}

export const trackService = new TrackService();
