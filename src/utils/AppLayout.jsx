import { Outlet } from "react-router-dom/dist";

const AppLayout = () => {
  return (
    <div>
      <h1>AppLayout</h1>
      <Outlet />
    </div>
  );
};

export default AppLayout;
