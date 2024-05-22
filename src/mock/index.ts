import Mock from "mockjs";

const evenList = Mock.mock({
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
      Checkbox: ["Pear"],
      Radio: "pear",
      ColorPicker: "@color", // 随机生成一个颜色值
      TextArea: "@cparagraph", // 随机生成一段中文文本
      id: "@guid", // 随机生成一个 GUID
    },
  ],
}).data;

Mock.mock(/\/event\/list/, "get", () => {
  return evenList;
});

const eventDetailReg = /\/event\/detail\/([^/]+)\/?$/;
Mock.mock(eventDetailReg, "get", (req) => {
  const { url } = req;
  const [, id] = url.match(eventDetailReg) || [];
  return evenList.find((i: any) => i.id === id) || {};
});

export default evenList;
