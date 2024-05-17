import React from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./styles.module.scss";

const HomeLayout: React.FC = () => {
  return (
    <div>
      <h1>admin</h1>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles["main"]}>
              main
              <div className={styles["title"]}>title</div>
            </div>
          }
        />
        <Route path="/a" element={<div>啊啊啊</div>} />
        <Route path="/b" element={<div>别别别</div>} />
      </Routes>
    </div>
  );
};
export default HomeLayout;
