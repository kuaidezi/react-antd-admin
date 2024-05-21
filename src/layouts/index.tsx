import HomeLayout from "./HomeLayout";
import PublicLayout from "./PublicLayout";

const config = [
  {
    path: "/admin",
    layout: HomeLayout,
  },
  {
    path: "/public",
    layout: PublicLayout,
  },
];
export default config;
