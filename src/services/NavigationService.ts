import {DomUtil} from "leaflet";
import getPosition = DomUtil.getPosition;

export class NavigationService {
    private error: boolean = false
    private coordinates: GeolocationCoordinates | null = null;

    constructor() {
        navigator.geolocation
            .getCurrentPosition(
                position => this.coordinates = position.coords,
                () => this.error = true
            )

    }

    hasLocation(): boolean {
        return this.coordinates !== null && !this.error;
    }

    hasError(): boolean {
        return this.error;
    }

    currentNavigation(): GeolocationCoordinates | null {
        return this.coordinates;
    }
}


