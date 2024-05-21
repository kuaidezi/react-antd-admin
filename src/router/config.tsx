import { ReactNode } from "react";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { GenerateIdentification } from "@/utils";

export interface IRouteObject {
  path: string;
  element?: ReactNode;
  title?: string | ReactNode;
  icon?: ReactNode;
  children?: IRouteObject[];
  id?: string;
  parentId?: string;
  default?: boolean;
}

const routerConfig: IRouteObject[] = [
  {
    path: "/admin/goods",
    title: "管理",
    icon: <DesktopOutlined />,
    children: [
      {
        path: "/admin/goods/list",
        title: "货物列表",
        element: <div>货物列表</div>,
        icon: <PieChartOutlined />,
      },
      {
        path: "/admin/goods/detail/:id/:name",
        title: "货物详情",
        element: <div>货物详情</div>,
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    path: "/admin/test",
    title: "测试1",
    icon: <DesktopOutlined />,
    children: [
      {
        path: "/admin/test/a",
        title: "测试a-1",
        element: <div>测试a-1</div>,
      },
      {
        path: "/admin/test/b",
        title: "测试b-1",
        element: <div>测试b-1</div>,
        children: [
          {
            path: "/admin/test/b/2a",
            title: "测试b-2a",
            element: <div>测试b-2a</div>,
          },
          {
            path: "/admin/test/b/2b",
            title: "测试b-2b",
            element: <div>测试b-2b</div>,
          },
          {
            path: "/admin/test/b/2c",
            title: "测试b-2c",
            element: <div>测试b-2c</div>,
            children: [
              {
                path: "/admin/test/b/2c/3a",
                title: "测试b-2c-3a",
                element: <div>测试b-2c-3a</div>,
              },
            ],
          },
        ],
      },
      {
        path: "/admin/test/c",
        title: "测试c-1",
        element: <div>测试c-1</div>,
      },
    ],
  },
  {
    path: "/public",
    title: "公开",
    icon: <FileOutlined />,
    children: [
      { path: "/public/a", title: "公开a", element: <div>公开a</div> },
      { path: "/public/b", title: "公开b", element: <div>公开b</div> },
    ],
  },
];

const configs = GenerateIdentification(routerConfig);

export default configs;
