import Mock from "mockjs";
import Day from "dayjs";

let evenList = Mock.mock({
  "data|3-20": [
    {
      Input1: "@cname",
      Input2: "@name", // 随机生成一个整数，范围在 1 到 100 之间
      Select: "demo",
      TreeSelect: "light",
      Cascader: ["zhejiang", "hangzhou"],
      InputNumber: "@float(0, 100, 2, 2)", // 随机生成一个两位小数的浮点数，范围在 0 到 100 之间
      DatePicker: "@datetime('yyyy-MM-dd HH:mm:ss')", // 随机生成一个日期时间，格式为 YYYY-MM-DD HH:mm:ss
      RangePicker: [
        "@datetime('yyyy-MM-dd HH:mm:ss')",
        "@datetime('yyyy-MM-dd HH:mm:ss')",
      ], // 随机生成一个日期时间范围数组
      Slider: "@integer(0, 100)", // 随机生成一个整数，范围在 0 到 100 之间
      Switch: "@boolean", // 随机生成一个布尔值
      Checkbox: ["Apple", "Orange"],
      Radio: "pear",
      ColorPicker: "@color", // 随机生成一个颜色值
      TextArea: "@cparagraph", // 随机生成一段中文文本
      id: "@guid", // 随机生成一个 GUID
    },
  ],
}).data;

evenList.forEach((ele: any) => {
  const [d1, d2] = ele.RangePicker;
  ele.RangePicker = Day(d1).isBefore(Day(d2)) ? ele.RangePicker : [d2, d1];
});

Mock.mock(/\/event\/list/, "get", () => {
  return evenList;
});

const eventDetailReg = /\/event\/detail\/([^/]+)\/?$/;
Mock.mock(eventDetailReg, "get", (req) => {
  const { url } = req;
  const [, id] = url.match(eventDetailReg) || [];
  return evenList.find((i: any) => i.id === id) || {};
});

Mock.mock(/\/event\/detail/, "put", (req) => {
  const { body: bodyJson } = req;

  const item = JSON.parse(bodyJson);
  evenList.forEach((ele: any) => {
    if (ele.id === item.id) {
      Object.assign(ele, item);
    }
  });

  return evenList.find((i: any) => i.id === item.id) || {};
});

Mock.mock(/\/event\/detail/, "post", (req) => {
  const { body: bodyJson } = req;

  const item = JSON.parse(bodyJson);
  const { id } = Mock.mock({ id: "@guid" });
  item.id = id;
  evenList.push(item);
  return item;
});

Mock.mock(/\/event\/detail/, "detele", (req) => {
  const { body: bodyJson } = req;

  const item = JSON.parse(bodyJson);
  const { id } = item;
  evenList.push(item);
  const _item = evenList.find((i: any) => i.id === id) || {};
  evenList = evenList.filter((i: any) => i.id !== id);
  return _item;
});

export default evenList;
