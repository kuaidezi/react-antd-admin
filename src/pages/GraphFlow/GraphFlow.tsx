import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Graph } from "@antv/x6";
import { omit } from "lodash";
import { Modal, Select } from "antd";
import {
  platformOption,
  edgeOption,
  getCustomNodeOption,
  rectWidth,
  plugUnitWidth,
  plugUnitList,
  leftRectId,
  centerRectId,
  rightRectId,
  topFillRectConfig,
  bottomFillRectConfig,
} from "./const";
import {
  GraphPlugUnitType,
  fetchGraphPlugUnitList,
} from "@/services/graphFlowServices";

Graph.registerNode("custom-node-top", getCustomNodeOption("top"));
Graph.registerNode("custom-node-bottom", getCustomNodeOption("bottom"));

const GraphFlow: FC = () => {
  const graphDiv = useRef<HTMLDivElement>(null);

  const [graph, setGraph] = useState<Graph>();
  const [graphPlugUnitList, setGraphPlugUnitList] =
    useState<GraphPlugUnitType[]>();
  const [graphPlug, setGraphPlug] = useState<GraphPlugUnitType>();

  useEffect(() => {
    fetchGraphPlugUnitList().then((res) => {
      console.log(res);
      setGraphPlugUnitList(res);
    });
  }, []);

  useEffect(() => {
    if (graphDiv.current) {
      const _graph = new Graph({
        container: graphDiv.current,
        autoResize: true,
        width: 1100,
        grid: {
          size: 10,
          visible: true,
          type: "dot", // 'dot' | 'fixedDot' | 'mesh'
          args: {
            color: "#a0a0a0", // 网格线/点颜色
            thickness: 1, // 网格线宽度/网格点大小
          },
        },
        interacting: { nodeMovable: false }, // 设置画布中元素不可交
      });

      setGraph(_graph);
    }
  }, []);

  useEffect(() => {
    if (graph) {
      initGraph();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph]);

  useEffect(() => {
    if (graph) {
      graph.on("node:click", ({ node }) => {
        const nodeData = node.getData() || {};
        if (nodeData.key) {
          return handleClickNode(nodeData);
        }
      });

      // 鼠标 Hover 时添加删除按钮
      graph.on("node:mouseenter", ({ cell }) => {
        if (cell.shape.indexOf("custom-node") === 0) {
          cell.addTools({
            name: "button-remove",
            args: {
              x: "100%",
              y: 0,
              offset: { x: 2, y: 2 },
              onClick: ({ cell: _cell }: any) => {
                const { label } = _cell.getData() || {};
                return Modal.confirm({
                  title: "提示",
                  content: `是否删除插件—${label}`,
                  onOk() {
                    _cell.remove();
                  },
                });
              },
            },
          });
        }
      });

      // 鼠标移开时删除删除按钮
      graph.on("node:mouseleave", ({ cell }) => {
        if (cell.shape.indexOf("custom-node") === 0) {
          cell.removeTools();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph]);

  useEffect(() => {
    if (!graph) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        graph.resize(width);
        graph.zoomToFit({
          padding: { left: 16, right: 16, top: 0, bottom: 0 },
        });
      }
    });
    const graphDivCurrent = graphDiv.current;
    if (graphDivCurrent) {
      resizeObserver.observe(graphDivCurrent);
    }

    // 清理函数，确保在组件卸载时停止观察
    return () => {
      if (graphDivCurrent) {
        resizeObserver.unobserve(graphDivCurrent);
      }
      resizeObserver.disconnect();
    };
  }, [graph]);

  /** 往画布新增或删除插件 */
  const handleClick = useCallback(
    (item: any) => {
      if (!graph) {
        return;
      }
      const exitNode = graph
        .getNodes()
        .find((i) => i.getData()?.key === item.key);
      if (exitNode) {
        exitNode.remove();
      } else {
        const centerPosition =
          graph
            .getNodes()
            .find((i) => i.id === centerRectId)
            ?.position().x || 0;
        const positionX =
          item.type === "letf"
            ? 20 + rectWidth + 20
            : centerPosition + rectWidth + 20;

        const sameTypeIndex =
          plugUnitList
            .filter((i) => i.shape === item.shape && i.type === item.type)
            .findIndex((n) => n.key === item.key) || 0;

        const x = sameTypeIndex * (plugUnitWidth + 20) + positionX;
        const cell = graph.addNode({
          ...item,
          x,
          data: omit(item, ["x", "y"]),
        });
        cell.setAttrByPath("label", { text: item.label });
      }
    },
    [graph]
  );

  useEffect(() => {
    if (!graph) {
      return;
    }
    graph.getNodes().forEach((i) => {
      if (i.getData()?.key.indexOf("settingKey") === 0) {
        i.remove();
      }
    });
    console.log(graphPlug);

    if (graphPlug) {
      graphPlug.plugList.forEach((ele) => {
        const item = plugUnitList.find((i) => i.key === ele);
        if (item) {
          handleClick(item);
        }
      });
    }
  }, [graphPlug, handleClick, graph]);

  /** 初始化出画布桩台、连线 */
  const initGraph = () => {
    if (!graph) {
      return;
    }

    const [leftRect, centerRect, rightRect] = [
      { ...platformOption, x: 20, id: leftRectId },
      {
        ...platformOption,
        x: (graph.options?.width - rectWidth) / 2,
        id: centerRectId,
      },
      {
        ...platformOption,
        x: graph.options?.width - rectWidth - 20,
        id: rightRectId,
      },
      topFillRectConfig,
      bottomFillRectConfig,
    ].map((item) => graph.addNode(item));

    [
      {
        source: { cell: leftRect, port: "right-port1" },
        target: { cell: centerRect, port: "left-port1" },
      },
      {
        source: { cell: centerRect, port: "right-port1" },
        target: { cell: rightRect, port: "left-port1" },
      },
      {
        source: { cell: rightRect, port: "left-port2" },
        target: { cell: centerRect, port: "right-port2" },
      },
      {
        source: { cell: centerRect, port: "left-port2" },
        target: { cell: leftRect, port: "right-port2" },
      },
    ].forEach((ele) => {
      graph.addEdge({ ...edgeOption, ...ele });
    });
  };

  const handleClickNode = (nodeData: any) => {
    console.log(nodeData);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div ref={graphDiv} style={{ flex: 1, height: 300 }}></div>
      </div>
      <div>
        <div>
          {graphPlugUnitList && (
            <Select
              allowClear
              style={{ width: 120 }}
              onChange={(v) => {
                setGraphPlug(graphPlugUnitList?.find((i) => i.id === v));
              }}
              options={graphPlugUnitList.map((i) => ({
                value: i.id,
                label: i.label,
              }))}
            />
          )}
        </div>

        <strong>上</strong>
        {plugUnitList
          .filter((i) => i.shape === "custom-node-top")
          .map((i) => (
            <button type="button" onClick={() => handleClick(i)} key={i.key}>
              {i.label}
            </button>
          ))}
      </div>
      <div>
        <strong>下</strong>
        {plugUnitList
          .filter((i) => i.shape === "custom-node-bottom")
          .map((i) => (
            <button type="button" onClick={() => handleClick(i)} key={i.key}>
              {i.label}
            </button>
          ))}
      </div>
    </>
  );
};
export default GraphFlow;
