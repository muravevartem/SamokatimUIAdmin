import {TransportTimePoint} from "../models/locations";

export class TrackService {
    async getTrack(transportId: number): Promise<TransportTimePoint[]> {
        // let response = await $api.get<TransportTimePoint[]>(
        //     `/v1/track`,
        //     {
        //         params:
        //             {
        //                 't':
        //                 transportId
        //             }
        //     });
        // return response.data;
        return []
    }
}

export const trackService = new TrackService();
