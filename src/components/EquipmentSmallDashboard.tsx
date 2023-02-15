import React, {CSSProperties, useEffect, useState} from "react";
import {Button, Rate, Space, Spin, Typography} from "antd";
import {GiElectric} from "react-icons/gi";

const STYLE_CONTAINER: CSSProperties = {
    position: 'fixed',
    right: 10,
    top: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    width: 300,
    height: 400,
    zIndex: 1000
}

type EquipmentSmallDashboardProps = {
    equipmentId: number,
    onClose: () => void
}

export const EquipmentSmallDashboard =
    ({equipmentId, onClose}: EquipmentSmallDashboardProps) => {

        const [loading, setLoading] = useState(false);

        useEffect(() => {
            console.log(equipmentId)
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1500)
        }, [])

        return (
            <div style={{
                ...STYLE_CONTAINER
            }}>
                <Spin spinning={loading}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 10
                    }}>
                        <Typography style={{fontWeight: 'bolder', fontSize: 24}}>Welt electro 29"</Typography>
                        <Space>
                            <GiElectric color='green' size={20}/>
                            <Rate character={'o'}
                                  allowHalf
                                  value={4}
                                  count={5}
                                  disabled
                                  style={
                                      {color: 'green'}
                                  }/>
                        </Space>
                        <Button type='text' onClick={onClose}>Закрыть</Button>
                    </div>
                </Spin>
            </div>
        )
    }
