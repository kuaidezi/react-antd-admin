import React, { ReactNode, useState } from "react";
import "./index.scss";

import { Layout } from "antd";
import RouterMenus from "./RouterMenus";

const { Header, Content, Footer, Sider } = Layout;

interface HomeLayoutProps {
  children?: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="home-layout">
      <Header className="header">Header</Header>
      <Layout>
        <Sider
          className="sider"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <RouterMenus />
        </Sider>
        <Layout>
          <Content className="content">{children}</Content>
          <Footer className="footer">Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default HomeLayout;
