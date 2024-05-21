import React, { FC, ReactNode } from "react";

interface PublicLayoutProps {
  children?: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div>
      <h2>Public</h2>
      {children}
    </div>
  );
};

export default PublicLayout;
