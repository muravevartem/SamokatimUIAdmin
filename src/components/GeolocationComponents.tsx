import React, {useCallback, useEffect, useMemo, useState} from "react";
import {MapContainer, Marker, Polyline, TileLayer} from "react-leaflet";
import L, {LatLng, LatLngExpression, Map as LeafletMap} from "leaflet";
import {App} from "antd";
import {EquipmentGeoPoint, EquipmentGeoTrack} from "../model/locations";
import {equipmentGeolocationService} from "../service/EquipmentGeolocationService";
import {AlertInfo, errorHandler} from "../error/ErrorHandler";
import {Alert, Button, ButtonGroup, Paper, Stack, Typography} from "@mui/material";
import {Equipment} from "../model/equipments";
import {equipmentService} from "../service/EquipmentService";

const center: LatLngExpression = [55.754028, 37.619909];
const zoom = 13;

type MapControlProps = {
    map: LeafletMap,
    onMove?: (position: LatLng) => any
}

const MapControl = (props: MapControlProps) => {
    const {map, onMove} = props;
    const [position, setPosition] = useState(() => map.getCenter());
    const {notification} = App.useApp();

    const onMapMove = useCallback(() => {
        setPosition(map.getCenter())
        if (onMove) onMove(position);
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
        map.on('move', onMapMove)
        return () => {
            map.off('move', onMapMove)
        }
    }, [map, onMapMove])

    return (
        <></>
    )
}

type MapWindowProps = {
    setMap: (map: LeafletMap) => any,
    route?: EquipmentGeoTrack[],
    points?: EquipmentGeoPoint[],
    onClickPoint?: (point: EquipmentGeoPoint) => any
}

const iconBike = new L.Icon({
    iconUrl: 'icon.svg',
    iconSize: [32, 32]
})

const MapWindow = (props: MapWindowProps) => {
    let {setMap, route, points, onClickPoint} = props;
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
                pathOptions={{color: 'blue'}}
                positions={route.map(v => [v.lat, v.lng])}
            />
        }
        {points &&
            points.map(point => (
                <Marker
                    icon={iconBike}
                    key={point.transportId}
                    position={point}
                    eventHandlers={{
                        click: (e) => {
                            console.log('click')
                            if (onClickPoint)
                                onClickPoint(point);
                        }
                    }}
                />
            ))
        }
    </MapContainer>
}


const EquipmentBaseInfoComponent = (props: {
    point: EquipmentGeoPoint,
    onClose: () => any
}) => {
    const [loading, setLoading] = useState(false);
    const [equipment, setEquipment] = useState<Equipment>()
    const [alert, setAlert] = useState<AlertInfo>()

    async function getInfo() {
        try {
            setLoading(true)
            let loadedEquipment = await equipmentService.getOne(props.point.transportId);
            setEquipment(loadedEquipment);
        } catch (e) {
            setAlert(errorHandler.handleError(e))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    if (loading)
        return <></>

    if (alert)
        return <Alert severity={alert.color} closeText='Закрыть' onClose={props.onClose}>{alert.message}</Alert>

    return (
        <Stack
            position={'fixed'}
            zIndex={9999}
            right={10}
            top={80}
        >
            <Paper>
                <Stack
                    spacing={1}
                    padding={2}
                >
                    <Typography
                        variant='h4'
                        fontWeight='bolder'
                    >
                        {equipment?.name}
                    </Typography>
                    <Typography
                        variant='h6'
                        fontWeight='lighter'
                    >
                        {equipment?.owner?.name}
                    </Typography>
                    <Typography
                        fontWeight='lighter'
                    >
                        Lat:{props.point.lat} Lng:{props.point.lng}
                    </Typography>
                    <Stack
                        alignItems='center'
                    >
                        <ButtonGroup variant='text'>
                            <Button
                                color='error'
                                onClick={props.onClose}
                            >
                                Закрыть
                            </Button>
                            <Button
                                href={`/equipments/${equipment?.id}`}
                            >
                                Подробнее
                            </Button>
                        </ButtonGroup>
                    </Stack>

                </Stack>
            </Paper>

        </Stack>
    )
}

export const CurrentGeolocationsComponent = () => {
    const [map, setMap] = useState<LeafletMap>();
    const [points, setPoints] = useState<EquipmentGeoPoint[]>([]);
    const [track, setTrack] = useState<EquipmentGeoTrack[]>();
    const [alert, setAlert] = useState<AlertInfo>()
    const [selected, setSelected] = useState<EquipmentGeoPoint>();

    const displayMap = useMemo(
        () => (
            <MapWindow
                setMap={setMap}
                points={points}
                route={track}
                onClickPoint={setSelected}
            />
        ),
        [points],
    )

    async function getTrack() {
        if (selected) {
            try {
                let geoTrack =
                    await equipmentGeolocationService.getTrack(selected.transportId);
                setTrack(geoTrack);
            } catch (e) {

            }
        } else {
            setTrack(undefined);
        }
    }

    async function getCurrentPositions() {
        if (map) {
            try {
                let equipmentGeoPoints =
                    await equipmentGeolocationService.getCurrentGeoPointsInMap(map);
                setPoints(equipmentGeoPoints);
                setAlert(undefined);
            } catch (e) {
                setAlert(errorHandler.handleError(e))
            }
        }
    }

    useEffect(() => {
        getCurrentPositions()
    }, [map])

    useEffect(() => {
        getTrack()
    }, [selected, points])

    return (
        <div style={{height: "100vh", position: 'relative'}}>
            {alert && <Alert severity={alert.color}>{alert.message}</Alert>}
            {selected &&
                <EquipmentBaseInfoComponent
                    point={selected}
                    onClose={() => setSelected(undefined)}
                />
            }
            {displayMap}
            {map ? <MapControl map={map} onMove={getCurrentPositions}/> : null}
        </div>
    )
}
