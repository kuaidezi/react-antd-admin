import React, { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, MenuProps } from "antd";

import routerConfig, { IRouteObject } from "@/router/config";
import { flattenRoutes, isMatchingThePath } from "@/utils";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const getMenus = () => {
  const list: any = [];
  const recursion = (config: IRouteObject, arr: any) => {
    const item: any = getItem(config.title, config.path!, config.icon);
    if (config.children) {
      config.children.forEach((ele) => {
        if (!item.children) {
          item.children = [];
        }
        recursion(ele, item?.children);
      });
    }
    arr.push(item);
  };
  routerConfig.forEach((item) => {
    recursion(item, list);
  });
  return list;
};

const flattenRoutesList: IRouteObject[] = flattenRoutes(routerConfig);

const RouterMenus: FC<MenuProps> = (props) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    const arr: string[] = [];

    const item = flattenRoutesList.find((i) =>
      isMatchingThePath(pathname, i.path)
    );

    if (item) {
      const recursion = (parentId: string | undefined) => {
        if (parentId) {
          const parentItem = flattenRoutesList.find((i) => i.id === parentId);
          arr.push(parentItem?.path!);
          recursion(parentItem?.parentId);
        }
      };
      recursion(item.parentId);
      setSelectedKeys([item.path]);
      setOpenKeys(arr);
    }
  }, [pathname]);

  return (
    <Menu
      theme="dark"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      mode="inline"
      items={getMenus()}
      onOpenChange={(v) => setOpenKeys(v)}
      onSelect={({ key }) => {
        setSelectedKeys([key]);
        navigate(key);
      }}
      {...props}
    />
  );
};

export default RouterMenus;
