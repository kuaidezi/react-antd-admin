import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "antd";
import { keys, set, isEmpty } from "lodash";
import Day from "dayjs";
import { fetchEventDetail } from "@/services/eventListServices";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const EventDetail: FC = () => {
  const [form] = Form.useForm();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchEventDetail(id).then((res) => {
        if (!isEmpty(res)) {
          const { DatePicker, RangePicker } = res;
          form.setFieldsValue({
            ...res,
            DatePicker: Day(DatePicker),
            RangePicker: RangePicker?.map((i) => Day(i)),
          });
        }
      });
    }
  }, [form, id]);

  const handleClickSave = () => {
    const formData = getData();
    console.log(formData);
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

  const handleClickFill = () => {};

  return (
    <Form form={form}>
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
          <Form.Item label="Checkbox" name="Checkbox" valuePropName="checked">
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
            <Button htmlType="button">Reset</Button>
            <Button type="link" htmlType="button" onClick={handleClickFill}>
              Fill form
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default EventDetail;
