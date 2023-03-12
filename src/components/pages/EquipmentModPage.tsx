import React from "react";
import {useParams} from "react-router-dom";
import {Input, Space} from "antd";

export const EquipmentModPage = () => {
    let params = useParams<string>();
    let equipmentId = Number.parseInt(params['equipmentId'] ?? '');
    return (
        <div>
            <Space direction='vertical'>
                <Input></Input>
            </Space>
        </div>
    )
}
