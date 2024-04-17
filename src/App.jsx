import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./utils/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="employee" element={<Employee />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
