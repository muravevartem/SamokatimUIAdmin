import React, {useEffect, useState} from "react";
import {Space, Table, Tag} from "antd";
import {ColumnType, TablePaginationConfig} from "antd/es/table";
import {beautifyType, Equipment, EquipmentType} from "../../models/equipments";
import {PresetColorKey} from "antd/es/theme/interface/presetColors";
import {FilterValue, SorterResult} from "antd/es/table/interface";

const getColorOfEquipmentType = (type?: EquipmentType): PresetColorKey => {
    switch (type) {
        case EquipmentType.BICYCLE:
            return 'blue'
        case EquipmentType.BICYCLE_EL:
            return 'red'
        case EquipmentType.SCOOTER:
            return 'magenta'
        case EquipmentType.SCOOTER_EL:
            return 'green'
        default:
            return 'yellow'
    }
}

const columns: ColumnType<Equipment>[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Название',
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        key: 'name'
    },
    {
        title: 'Владелец',
        dataIndex: 'owner',
        key: 'owner',
        render: (_, record) => (
            record.owner?.name
        )
    },
    {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
        render: (_, record) => (
            <Tag color={getColorOfEquipmentType(record.type)}>
                {beautifyType(record.type)}
            </Tag>
        )
    },
    {
        title: 'Действие',
        key: 'action',
        render: (_, record) => (
            <Space direction="vertical" size='small'>
                <a href={`/map?equipment=${record.id}`}>Карта</a>
                <a href={`/equipments/${record.id}`}>Изменить</a>

            </Space>
        )
    }
]

const dummyData: Equipment[] = [
    {
        id: 1,
        name: 'SUPER-BIKE',
        type: EquipmentType.BICYCLE,
        owner: {
            id: 1,
            inn: '123456789',
            name: 'ООО "Помидорка"'
        }
    },
    {
        id: 1,
        name: 'SUPER-BIKE',
        type: EquipmentType.BICYCLE_EL,
        owner: {
            id: 1,
            inn: '123456789',
            name: 'ООО "Помидорка"'
        }
    },
    {
        id: 1,
        name: 'SUPER-BIKE',
        type: EquipmentType.SCOOTER,
        owner: {
            id: 1,
            inn: '123456789',
            name: 'ООО "Помидорка"'
        }
    },
    {
        id: 1,
        name: 'SUPER-BIKE',
        type: EquipmentType.SCOOTER_EL,
        owner: {
            id: 1,
            inn: '123456789',
            name: 'ООО "Помидорка"'
        }
    },
    {
        id: 1,
        name: 'SUPER-BIKE',
        owner: {
            id: 1,
            inn: '123456789',
            name: 'ООО "Помидорка"'
        }
    }

]

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue | null>;
}

export const EquipmentPage = () => {
    const [data, setData] = useState<Equipment[]>([])
    const [loading, setLoading] = useState(true)
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 20,
            position: ['bottomCenter']
        }
    })


    useEffect(() => {
        setLoading(true);
        (async () => {
            setTimeout(() => {
                setLoading(false)
                setData(dummyData)
            }, 1500)
        })()
    }, [JSON.stringify(tableParams)])

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<Equipment> | SorterResult<Equipment>[]
    ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter
        })
    }

    return (
        <div style={{
            padding: 10
        }}>
            <Table columns={columns}
                   rowKey={record => record.id ?? 0}
                   dataSource={data}
                   loading={loading}
                   onChange={handleTableChange}
                   pagination={tableParams.pagination}
            />
        </div>
    )
}
