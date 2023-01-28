import React, {useEffect, useMemo, useRef, useState} from "react";
import {MapContainer, Marker, Polyline, TileLayer, useMapEvents} from "react-leaflet";
import L, {Icon as IconLeaflet, LatLng, Marker as LeafletMarker} from "leaflet";
import {eventChannel, GetLocation} from "../events/EventChannel";
import {App, Button, Divider, Input, Modal, Select, Space, Switch} from "antd";
import {AimOutlined, FilterOutlined} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import {beautify, EquipmentStatus} from "../models/equipments";
import Title from "antd/es/typography/Title";
import {trackService} from "../services/TrackService";
import {TransportTimePoint} from "../models/locations";
import {AxiosError} from "axios";


const CURRENT_LOCATION_MARKER_OPTIONS: IconLeaflet = L.icon({
    iconUrl: 'https://psv4.userapi.com/c240331/u252030396/docs/d47/37895548f019/GRAF_1674922051680.png?extra=hUsC_dVgqFt84de2KQcNK0McNxzsYnaFLz-KokzhYLoLqMZEvROEEHGJ1G06rXnIJk_ik8W020azb7bB-K-Dqz1oUJUEZ9pkeWeRN17KeUG0DNmzwgk0oioPJqMy7IhKSzESfbH9V-usDHNpWLpFyqq_',
    iconSize: [20, 40]
})

const DUMMY: LatLng[] = [
    new LatLng(51.5, 46),
    new LatLng(50.5, 46)
]

type Pos = {
    id: string
    latitude: number,
    longitude: number
}


export const MapComponent = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showBikes, setShowBikes] = useState(true);
    const [showScooters, setShowScooters] = useState(true);
    const [statuses, setStatuses] = useState([EquipmentStatus.FREE]);
    const [track, setTrack] = useState<TransportTimePoint[]>()
    const [search, setSearch] = useState<string>('12');
    let {notification} = App.useApp();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        let foo = async () => {
            try {
                if (search) {
                    let track = await trackService.getTrack(Number.parseInt(search));
                    setTrack(track)
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.status === 404) {
                        notification.error({
                            message: 'Оборудование не найдено'
                        })
                    } else {
                        notification.error({
                            message: 'Неизвестная ошибка'
                        })
                    }
                }
            }
        }
        setTimeout(() => foo(), 2000)

    }, [search, track])

    return (
        <div
        >
            <MapContainer
                style={{
                    height: '100vh',
                    width: '100%',
                }}
                center={[55.754028, 37.619909]}
                zoom={13}
                scrollWheelZoom={true}>
                <Locator/>
                <div
                    style={{
                        position: "fixed",
                        zIndex: 999,
                        right: 20,
                        top: 20
                    }}>
                    <Space>
                        <Button
                            icon={<AimOutlined/>}
                            onClick={() => eventChannel.raise(new GetLocation())}>
                        </Button>
                        <Divider/>
                        <Button
                            type='primary'
                            icon={<FilterOutlined/>}
                            onClick={showModal}>
                        </Button>
                        <Modal title='Фильтры' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Space>
                                <FormItem
                                    label='Велосипеды'>
                                    <Switch
                                        checked={showBikes}
                                        onChange={e => setShowBikes(e)}/>
                                </FormItem>
                                <FormItem
                                    label='Самокаты'>
                                    <Switch
                                        checked={showScooters}
                                        onChange={e => setShowScooters(e)}/>
                                </FormItem>
                                <FormItem
                                    label='Статус'>
                                    <Select
                                        mode='multiple'
                                        allowClear
                                        defaultValue={statuses.map(value => beautify(value))}
                                    />
                                </FormItem>
                                <FormItem
                                    label='Поиск'>
                                    <Input value={search} onChange={s => {
                                        setSearch(s.target.value)
                                    }}/>
                                </FormItem>
                            </Space>
                        </Modal>
                    </Space>
                </div>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {track &&
                    <Polyline
                        pathOptions={{color: 'black'}}
                        positions={track.map(v => [v.lat, v.lng])}
                    />
                }
            </MapContainer>
        </div>
    )
}

type LocatorProps = {}

function Locator(props: LocatorProps) {
    let {message, notification} = App.useApp();

    let map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng)
        },
        locationerror(e) {
            notification.error({
                key: 1,
                message: <Title level={4}>Ошибка получения текущего местоположения</Title>,
                description: 'Нет доступа для получения данных местоположения',
                placement: 'top'
            })
        }
    })

    useEffect(() => {
        eventChannel.subscribe<GetLocation>(GetLocation.name, () => {
            map.locate()
        })
    }, [])

    return <></>
}


type DraggableMarkerProps = {
    onPosition: (pos: LatLng) => void,
    position: LatLng
}

function DraggableMarker(props: DraggableMarkerProps) {
    const markerRef = useRef<LeafletMarker | null>(null);

    const eventHandler = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    props.onPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )

    // const map = useMapEvents({
    //     locationerror(e) {
    //         notification.error({
    //             key: 1,
    //             message: <Title level={4}>Ошибка получения текущего местоположения</Title>,
    //             description: 'Нет доступа для получения данных местоположения',
    //             placement: 'top'
    //         })
    //     },
    //     locationfound(e) {
    //         props.onPosition(e.latlng)
    //         map.flyTo(e.latlng, map.getZoom(), {duration: 1})
    //     }
    // });

    // useEffect(() => {
    //     map.locate()
    //     eventChannel.subscribe(GetLocation.name, event => map.locate())
    // }, [])

    return (
        <Marker
            icon={CURRENT_LOCATION_MARKER_OPTIONS}
            draggable={false}
            position={props.position}
            eventHandlers={eventHandler}
            ref={markerRef}
        />
    )
}
