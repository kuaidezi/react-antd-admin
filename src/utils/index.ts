import { IRouteObject } from "@/router/config";
import { isEmpty, set, omit } from "lodash";
import { v4 as uuid } from "uuid";

//将嵌套的树形配置拍平
const flattenRoutes = (routes: any[], childrenKey = "children") => {
  const flattenedRoutes: any = [];

  const recursion = (arr: any) => {
    arr.forEach((item: any) => {
      flattenedRoutes.push(omit(item, childrenKey));
      if (!isEmpty(item[childrenKey])) {
        recursion(item[childrenKey]);
      }
    });
  };
  recursion(routes);

  return flattenedRoutes;
};

/** 路由配置遍历生成唯一标识 */
const GenerateIdentification = (_routerConfig: IRouteObject[]) => {
  const recursion = (configs: IRouteObject[], parentId: string) => {
    if (!isEmpty(configs)) {
      configs.forEach((item) => {
        const _id = uuid();
        set(item, ["id"], _id);
        set(item, ["parentId"], parentId);
        recursion(item.children!, _id);
      });
    }
  };
  _routerConfig.forEach((config) => {
    const id = uuid();
    set(config, ["id"], id);
    recursion(config.children!, id);
  });
  return _routerConfig;
};

/** 检验路由是否匹配 */
const isMatchingThePath = (path: string, routeTemplate: string) => {
  // 使用非贪婪的(.*?)替换模板中的:参数名，并且添加边界条件以确保不会匹配到/
  const regex = new RegExp(
    `^${routeTemplate.replace(/:(\w+)/g, "(?:[^/]+?)")}$`
  );

  // 并且在内部使用了[^/]+?来匹配一个或多个非/字符，+?表示非贪婪匹配
  return regex.test(path);
};

export { GenerateIdentification, flattenRoutes, isMatchingThePath };
