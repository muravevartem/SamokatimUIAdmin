import React, {useCallback, useEffect, useMemo, useState} from "react";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import {App} from "antd";
import {TransportTimePoint} from "../model/locations";
import {useSearchParams} from "react-router-dom";
import {EquipmentSmallDashboard} from "./EquipmentSmallDashboard";

const center: LatLngExpression = [55.754028, 37.619909];
const zoom = 13;

type MapControlProps = {
    map: any
}

const MapControl = ({map}: MapControlProps) => {
    const [position, setPosition] = useState(() => map.getCenter());
    const {notification} = App.useApp();

    const onMove = useCallback(() => {
        setPosition(map.getCenter())
    }, [map])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position =>
                map.setView([position.coords.latitude, position.coords.longitude], map.getZoom()),
            positionError =>
                notification.error({key: positionError.code, message: 'Не удалось получить местоположение'})
        )
    }, [])

    useEffect(() => {
        map.on('move', onMove)
        return () => {
            map.off('move', onMove)
        }
    }, [map, onMove])

    return (
        <></>
    )
}

type MapWindowProps = {
    setMap: (map: any) => any,
    route?: TransportTimePoint[]
}

const MapWindow = ({setMap, route}: MapWindowProps) => {
    return <MapContainer
        style={{
            height: '100%',
            width: '100%',
        }}
        ref={setMap}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}>

        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {route &&
            <Polyline
                pathOptions={{color: 'black'}}
                positions={route.map(v => [v.lat, v.lng])}
            />
        }
    </MapContainer>
}

export const MapComponent = () => {
    const [map, setMap] = useState<any>(null);
    let [searchParams, setSearchParams] = useSearchParams();
    let [showEquipment, setShowEquipment] = useState(searchParams.has('equipment'));
    console.log(searchParams)
    let equipmentid = searchParams.get('equipment')
    const displayMap = useMemo(
        () => (
            <MapWindow setMap={setMap}/>
        ),
        [],
    )

    return (
        <div style={{height: "100vh"}}>
            {displayMap}
            {showEquipment && equipmentid ? <EquipmentSmallDashboard equipmentId={Number.parseInt(equipmentid)}
                                                                     onClose={() => setShowEquipment(false)}/> : null}
            {map ? <MapControl map={map}/> : null}
        </div>
    )
}
