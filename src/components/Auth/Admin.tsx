import React, { useContext, PropsWithChildren } from "react";
import { AuthContext } from "../../context/auth.context";

const Admin: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);
  if (isAdmin) {
    return children;
  } else {
    return null;
  }
};
export default Admin;
