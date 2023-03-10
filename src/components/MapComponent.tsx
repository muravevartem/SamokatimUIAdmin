import React, {useEffect, useState} from "react";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";
import L, {Icon as IconLeaflet, LatLng} from "leaflet";
import {eventChannel, GetLocation} from "../events/EventChannel";
import {App, Button, Divider, Modal, Select, Space, Switch} from "antd";
import {AimOutlined, FilterOutlined} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import {beautify, EquipmentStatus} from "../models/equipments";
import Title from "antd/es/typography/Title";


const CURRENT_LOCATION_MARKER_OPTIONS: IconLeaflet = L.icon({
    iconUrl: 'https://biographe.ru/wp-content/uploads/2021/12/4123123-32.jpg',
    iconSize: [40, 40]
})


export const MapComponent = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showBikes, setShowBikes] = useState(true);
    const [showScooters, setShowScooters] = useState(true);
    const [statuses, setStatuses] = useState([EquipmentStatus.FREE]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div
        >
            <MapContainer
                style={{
                    height: '100vh',
                    width: '100%',
                }}
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={true}>
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
                        <Modal title='??????????????' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Space>
                                <FormItem
                                    label='????????????????????'>
                                    <Switch
                                        checked={showBikes}
                                        onChange={e => setShowBikes(e)}/>
                                </FormItem>
                                <FormItem
                                    label='????????????????'>
                                    <Switch
                                        checked={showScooters}
                                        onChange={e => setShowScooters(e)}/>
                                </FormItem>
                                <FormItem
                                    label='????????????'>
                                    <Select
                                        mode='multiple'
                                        allowClear
                                        defaultValue={statuses.map(value => beautify(value))}
                                    />
                                </FormItem>
                            </Space>
                        </Modal>
                    </Space>
                </div>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CurrentLocationMarker/>
            </MapContainer>
        </div>
    )
}

const CurrentLocationMarker = () => {
    const [position, setPosition] = useState<LatLng | null>(null)
    let {message, notification} = App.useApp();
    const map = useMapEvents({
        locationerror(e) {
            notification.error({
                key: 1,
                message: <Title level={4}>???????????? ?????????????????? ???????????????? ????????????????????????????</Title>,
                description: '?????? ?????????????? ?????? ?????????????????? ???????????? ????????????????????????????',
                placement: 'top'
            })
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom(), {duration: 1})
        }
    });


    useEffect(() => {
        map.locate()
        // eventChannel.subscribe(GetLocation.name, event => map.locate())
    }, [])

    return position === null
        ? null
        : (
            <Marker
                icon={CURRENT_LOCATION_MARKER_OPTIONS}
                position={position}>
            </Marker>
        )
}
