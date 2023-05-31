import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const jwtToken = localStorage.getItem("jwtToken");
  return jwtToken ? (children as any) : ((<Navigate to={"/"} />) as any);
};

export default ProtectedRoute;
