import { FC, HTMLAttributes, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./index.scss";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  backPath?: string;
  title?: string;
}

const PageHeader: FC<PageHeaderProps> = ({
  children,
  backPath,
  title,
  ...other
}) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    if (backPath) {
      navigate(backPath);
    }
  };

  return (
    <div className="page-header" {...other}>
      <div className="page-header-title">
        {backPath && (
          <Button
            shape="default"
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleClickBack}
          />
        )}
        {title}
      </div>
      <div className="page-header-btns">{children}</div>
    </div>
  );
};
export default PageHeader;
