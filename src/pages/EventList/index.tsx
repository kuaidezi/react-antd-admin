import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableProps, Tag, Switch, Space, Button } from "antd";
import {
  EventListDataType,
  fetchEventList,
} from "@/services/eventListServices";

const EventList: FC = () => {
  const [data, setData] = useState<EventListDataType[]>();

  useEffect(() => {
    fetchEventList().then((res) => {
      setData(res);
    });
  }, []);

  const navigate = useNavigate();

  const handleClickEdit = (record: EventListDataType) => {
    navigate(`/public/event/detail/${record.id}`);
  };

  const columns: TableProps<EventListDataType>["columns"] = [
    {
      title: "Input1",
      dataIndex: "Input1",
    },
    {
      title: "Input2",
      dataIndex: "Input2",
    },
    {
      title: "Select",
      dataIndex: "Select",
    },
    {
      title: "TreeSelect",
      dataIndex: "TreeSelect",
      key: "TreeSelect",
    },
    {
      title: "Cascader",
      dataIndex: "Cascader",
      render: (value) => {
        const [d1, d2] = value || [];
        return (
          <>
            <Tag color="geekblue">{d1}</Tag> <Tag color="green">{d2}</Tag>
          </>
        );
      },
    },
    {
      title: "InputNumber",
      dataIndex: "InputNumber",
    },
    {
      title: "DatePicker",
      dataIndex: "DatePicker",
    },
    {
      title: "RangePicker",
      dataIndex: "RangePicker",
      render: (value) => {
        const [d1, d2] = value || [];
        return (
          <>
            <Tag color="geekblue">{d1}</Tag> <Tag color="green">{d2}</Tag>
          </>
        );
      },
    },
    {
      title: "Slider",
      dataIndex: "Slider",
    },
    {
      title: "Switch",
      dataIndex: "Switch",
      render: (value) => <Switch value={value} disabled />,
    },
    {
      title: "Checkbox",
      dataIndex: "Checkbox",
    },
    {
      title: "Radio",
      dataIndex: "Radio",
    },
    {
      title: "ColorPicker",
      dataIndex: "ColorPicker",
      render: (value) => <Tag color={value}>{value}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleClickEdit(record)}>
            Edit
          </Button>
          <Button type="link">Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ overflow: "auto", height: "100%" }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};
export default EventList;
