import { FC, ReactNode } from "react";
import "./index.scss";

interface PublicLayoutProps {
  children?: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="public-layout">
      <div className="public-layout-title">Public页面</div>
      <div className="public-layout-content">{children}</div>
    </div>
  );
};

export default PublicLayout;
