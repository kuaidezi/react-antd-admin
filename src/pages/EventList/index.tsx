import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableProps,
  Tag,
  Switch,
  Space,
  Button,
  Modal,
  message,
} from "antd";
import {
  EventListDataType,
  deteleEventDetail,
  fetchEventList,
} from "@/services/eventListServices";

const EventList: FC = () => {
  const [data, setData] = useState<EventListDataType[]>();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setLoading(true);
    fetchEventList()
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  };
  const navigate = useNavigate();

  const handleClickEdit = (record: EventListDataType) => {
    navigate(`/public/event/detail/${record.id}`);
  };

  const handleClcikDelete = (record: EventListDataType) => {
    Modal.confirm({
      title: "Confirm",
      content: "Sure delete Record?",
      onOk: () => {
        deteleEventDetail(record).then(() => {
          messageApi.success({ content: "delete successful" });
          init();
        });
      },
    });
  };

  const columns: TableProps<EventListDataType>["columns"] = [
    {
      title: "Input1",
      dataIndex: "Input1",
      width: 80,
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
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleClickEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleClcikDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {contextHolder}
      <div style={{ width: "80%", height: "700px" }}>
        <Button
          type="primary"
          style={{ marginBottom: 8 }}
          onClick={() => navigate("/public/event/create")}
        >
          Add
        </Button>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          scroll={{ x: "max-content", y: 600 }}
        />
      </div>
    </div>
  );
};
export default EventList;
