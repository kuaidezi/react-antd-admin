import { FC, HTMLAttributes, ReactNode } from "react";
import "./index.scss";

interface PageContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const PageContent: FC<PageContentProps> = ({ children, ...other }) => {
  console.log(other);

  return (
    <div className="page-content" {...other}>
      {children}
    </div>
  );
};
export default PageContent;
