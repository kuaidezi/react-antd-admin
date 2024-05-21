import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import layoutsConfig from "@/layouts";
import routeConfig, { IRouteObject } from "./config";
import { flattenRoutes } from "@/utils";
import NotFound from "@/layouts/NotFound";

const Layouts = () => {
  const getLayoutItem = (ele: IRouteObject, relativePath?: string) => {
    const layoutItem = layoutsConfig.find(
      (item) => ele.path?.indexOf(item.path) === 0
    );

    const Com = layoutItem?.layout;

    return (
      <Route
        key={ele.path}
        path={relativePath}
        element={Com ? <Com>{ele.element}</Com> : ele.element}
      />
    );
  };

  const renderRoute = () => {
    return routeConfig.map((ele) => {
      if (ele.children) {
        return [
          <Route
            key={ele.path}
            path={ele.path}
            element={
              <Navigate
                to={
                  ele.children.find((i) => i.default)?.path ||
                  ele.children?.[0].path
                }
              />
            }
          />,
          <Route
            path={`${ele.path}/*`}
            key={ele.path}
            element={
              <Routes>
                {flattenRoutes(ele.children).map((item: IRouteObject) => {
                  const relativePath =
                    item.path.indexOf(ele.path) === 0
                      ? item.path.replace(ele.path, "")
                      : item.path;
                  return getLayoutItem(item, relativePath);
                })}
                {getLayoutItem({ ...ele, element: <NotFound /> }, "/*")}
              </Routes>
            }
          />,
        ];
      }
      return (
        <Route key={ele.path} path={ele.path} element={getLayoutItem(ele)} />
      );
    });
  };

  const renderLayoutNotFound = () => {
    return layoutsConfig.map((item) => {
      const Com = item.layout;
      return (
        <Route
          key={item.path}
          path={`${item.path}/*`}
          element={
            <Com>
              <NotFound />
            </Com>
          }
        />
      );
    });
  };
  return (
    <Router>
      <Routes>
        {renderRoute()}
        {renderLayoutNotFound()}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default Layouts;
