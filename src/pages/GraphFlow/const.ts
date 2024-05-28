import { v4 as uuid } from "uuid";

const [leftRectId, centerRectId, rightRectId] = [uuid(), uuid(), uuid()];

const [positionY, rectWidth, plugUnitWidth] = [120, 100, 35];

const plugUnitList = [
  {
    key: "settingKey1",
    label: "插件1",
    x: 140,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "letf",
  },
  {
    key: "settingKey2",
    label: "插件2",
    x: 190,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "letf",
  },
  {
    key: "settingKey3",
    label: "插件3",
    x: 240,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "letf",
  },
  {
    key: "settingKey4",
    label: "插件4",
    x: 290,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "letf",
  },
  {
    key: "settingKey5",
    label: "插件5",
    x: 340,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "letf",
  },
  {
    key: "settingKey6",
    label: "插件6",
    x: 550,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "right",
  },
  {
    key: "settingKey7",
    label: "插件7",
    x: 600,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "right",
  },
  {
    key: "settingKey8",
    label: "插件8",
    x: 650,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "right",
  },
  {
    key: "settingKey9",
    label: "插件9",
    x: 700,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "right",
  },
  {
    key: "settingKey10",
    label: "插件10",
    x: 750,
    y: positionY - 15,
    shape: "custom-node-top",
    type: "right",
  },
  {
    key: "settingKey11",
    label: "插件11",
    x: 140,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "letf",
  },
  {
    key: "settingKey12",
    label: "插件12",
    x: 190,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "letf",
  },
  {
    key: "settingKey13",
    label: "插件13",
    x: 240,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "letf",
  },
  {
    key: "settingKey14",
    label: "插件14",
    x: 290,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "letf",
  },
  {
    key: "settingKey15",
    label: "插件15",
    x: 340,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "letf",
  },
  {
    key: "settingKey16",
    label: "插件16",
    x: 550,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "right",
  },
  {
    key: "settingKey17",
    label: "插件17",
    x: 600,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "right",
  },
  {
    key: "settingKey18",
    label: "插件18",
    x: 650,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "right",
  },
  {
    key: "settingKey19",
    label: "插件19",
    x: 700,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "right",
  },
  {
    key: "settingKey20",
    label: "插件20",
    x: 750,
    y: positionY + 155,
    shape: "custom-node-bottom",
    type: "right",
  },
];

const platformOption = {
  x: 440,
  y: positionY,
  width: rectWidth,
  height: 180,
  attrs: {
    body: {
      fill: "#f5f5f5",
      stroke: "#d9d9d9",
      strokeWidth: 1,
      rx: 8,
      ry: 8,
    },
  },
  ports: {
    groups: {
      right: {
        position: "right",
        attrs: {
          circle: {
            r: 0,
            strokeWidth: 0,
          },
        },
      },
      left: {
        position: "left",
        attrs: {
          circle: {
            r: 0,
            strokeWidth: 0,
          },
        },
      },
    },
    items: [
      { id: "left-port1", group: "left" },
      { id: "left-port2", group: "left" },
      {
        id: "right-port1",
        group: "right",
      },
      {
        id: "right-port2",
        group: "right",
      },
    ],
  },
};

const topFillRectConfig = {
  shape: "rect",
  x: 20,
  y: platformOption.y - 35,
  width: rectWidth,
  height: 30,
  attrs: {
    body: {
      fill: "transparent",
      strokeWidth: 0,
    },
  },
};
const bottomFillRectConfig = {
  ...topFillRectConfig,
  y: platformOption.y + platformOption.height,
};

const edgeOption = {
  attrs: {
    line: {
      strokeWidth: 8,
      stroke: {
        type: "linearGradient",
        stops: [
          { offset: "0%", color: "#adde93" },
          { offset: "50%", color: "#73d13d" },
          { offset: "100%", color: "#4fd601" },
        ],
      },
      targetMarker: {
        name: "block",
        fill: "#4fd601",
        strokeWidth: 0,
        width: 10,
        height: 15,
        offset: 0,
      },
    },
  },
};

const getCustomNodeOption = (type: "top" | "bottom") => ({
  inherit: "rect",
  width: plugUnitWidth,
  height: 40,
  attrs: {
    body: {
      stroke: "#5F95FF",
      fill: "transparent",
      refWidth: 1,
      refHeight: 1,
      rx: 4,
      ry: 4,
      cursor: "pointer",
    },
    image: {
      "xlink:href":
        "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
      width: 16,
      height: 16,
      x: 10,
      cursor: "pointer",
      y: 12,
    },
    line: {
      stroke: "#5F95FF",
      fill: "none",
      width: 1,
      height: 15,
      cursor: "pointer",
    },
    label: {
      text: "插件服务",
      refX: 20,
      refY: type === "top" ? -10 : 50,
      fontSize: 12,
      fill: "rgba(74, 15, 239, 0.6)",
      textAnchor: "middle",
      cursor: "pointer",
    },
  },
  markup: [
    {
      tagName: "rect",
      selector: "line",
      attrs: {
        x: 35 / 2,
        y: type === "top" ? 40 : -15,
      },
    },
    {
      tagName: "rect",
      selector: "body",
    },
    {
      tagName: "image",
      selector: "image",
    },
    {
      tagName: "text",
      selector: "label",
    },
  ],
});

export {
  leftRectId,
  centerRectId,
  rightRectId,
  positionY,
  rectWidth,
  plugUnitWidth,
  plugUnitList,
  platformOption,
  edgeOption,
  getCustomNodeOption,
  topFillRectConfig,
  bottomFillRectConfig,
};
