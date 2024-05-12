import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "../features/authentication/useUser";

import BigSpinner from "../utils/BigSpinner";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <div
        className="bg-gradient-to-bl from-slate-400 to-slate-600 flex justify-center items-center"
        style={{
          height: "100vh",
        }}
      >
        <BigSpinner />
      </div>
    );

  if (isAuthenticated) return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
