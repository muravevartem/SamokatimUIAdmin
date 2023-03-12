import {TransportTimePoint} from "../model/locations";
import {$apiMonitor} from "../config";

export class TrackService {
    async getTrack(transportId: number): Promise<TransportTimePoint[]> {
        let response = await $apiMonitor.get<TransportTimePoint[]>(
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
