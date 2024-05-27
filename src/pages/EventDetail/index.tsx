import { FC, useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Row,
  Col,
  Button,
  Space,
  message,
  Spin,
} from "antd";
import { keys, set, isEmpty } from "lodash";
import Day from "dayjs";
import {
  createEventDetail,
  fetchEventDetail,
  updateEventDetail,
} from "@/services/eventListServices";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const EventDetail: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState<any>();

  const { id } = useParams();

  const init = useCallback(
    (id: string) => {
      setLoading(true);
      fetchEventDetail(id)
        .then((res) => {
          if (!isEmpty(res)) {
            const { DatePicker, RangePicker } = res;
            const values = {
              ...res,
              DatePicker: Day(DatePicker),
              RangePicker: RangePicker?.map((i) => Day(i)),
            };

            setInitialValues(values);
            form.setFieldsValue(values);
          } else {
            messageApi.open({
              type: "error",
              content: "no date",
            });
          }
        })
        .finally(() => setLoading(false));
    },
    [form, messageApi]
  );

  useEffect(() => {
    if (id) {
      init(id);
    }
  }, [id, init]);

  const handleClickSave = async () => {
    const formData = { ...getData(), ...initialValues };
    const fn = id ? updateEventDetail : createEventDetail;
    setLoading(true);
    const res = await fn(formData);
    setLoading(false);

    if (!isEmpty(res) && res.id) {
      if (!id) {
        return navigate(`/public/event/detail/${res.id}`, { replace: true });
      }
      init(res.id);
      messageApi.open({
        type: "success",
        content: "save successful",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "save error",
      });
    }
  };

  const hanldeClickReset = () => {
    form.setFieldsValue(initialValues);
    messageApi.open({
      type: "success",
      content: "Reset successful",
    });
  };

  const getData = () => {
    const formValue = form.getFieldsValue();
    keys(formValue).forEach((key) => {
      const value = formValue[key] || {};
      if (key === "ColorPicker" && value.toHexString) {
        set(formValue, ["ColorPicker"], value.toHexString());
      } else if (key === "DatePicker" && value.format) {
        set(formValue, ["DatePicker"], value.format("YYYY-MM-DD HH:mm:ss"));
      } else if (key === "RangePicker" && value[0] && value[0].format) {
        set(
          formValue,
          ["RangePicker"],
          value.map((i: any) => i.format("YYYY-MM-DD HH:mm:ss"))
        );
      }
    });
    return formValue;
  };

  return (
    <Spin spinning={loading}>
      {contextHolder}
      <Form form={form} style={{ padding: 16 }}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Input1" name="Input1">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Input2" name="Input2">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Select" name="Select">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="TreeSelect" name="TreeSelect">
              <TreeSelect
                treeData={[
                  {
                    title: "Light",
                    value: "light",
                    children: [{ title: "Bamboo", value: "bamboo" }],
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Cascader" name="Cascader">
              <Cascader
                options={[
                  {
                    value: "zhejiang",
                    label: "Zhejiang",
                    children: [
                      {
                        value: "hangzhou",
                        label: "Hangzhou",
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="InputNumber" name="InputNumber">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="DatePicker" name="DatePicker">
              <DatePicker showTime />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="RangePicker" name="RangePicker">
              <RangePicker showTime />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Slider" name="Slider">
              <Slider />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Switch" valuePropName="checked" name="Switch">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Checkbox" name="Checkbox">
              <Checkbox.Group options={["Apple", "Pear", "Orange"]} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Radio" name="Radio">
              <Radio.Group>
                <Radio value="apple"> Apple </Radio>
                <Radio value="pear"> Pear </Radio>
                <Radio value="water"> Water </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="ColorPicker" name="ColorPicker">
              <ColorPicker showText />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="TextArea" name="TextArea">
          <TextArea />
        </Form.Item>

        <Row gutter={24}>
          <Col span={24} style={{ justifyContent: "center", display: "flex" }}>
            <Space>
              <Button type="primary" onClick={handleClickSave}>
                Submit
              </Button>
              <Button onClick={hanldeClickReset}>Reset</Button>
              <Button onClick={() => navigate("/public/event/list")}>
                back
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default EventDetail;
