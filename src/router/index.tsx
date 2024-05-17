import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomeLayout from "@/layouts/homeLayout";

// import Login from "@/views/login";

const CRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<HomeLayout />} />
        <Route path="/c" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
export default CRouter;
// if (!token) {
//   return <Redirect to="/login" />;
// } else {
//   if (role) {
//   } else {
//     getUserInfo(token).then(() => <Layout />);
//   }
// }
