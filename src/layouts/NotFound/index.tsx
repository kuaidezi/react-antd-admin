import { CSSProperties, FC } from "react";

import notFoundImg from "@/assets/imgs/notFound.svg";

import "./index.css";

interface IProps {
  title?: string;
  imgStyle?: CSSProperties;
}
const NotFound: FC<IProps> = (props) => {
  const { title = "404 找不到页面！", imgStyle } = props;
  return (
    <div className="notfound-container">
      <img src={notFoundImg} alt="404" style={imgStyle} />
      <h3>{title}</h3>
    </div>
  );
};

export default NotFound;
