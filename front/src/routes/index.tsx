import { BrowserRouter as Router } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { AuthRoutes } from "./auth.routes";
import { PublicRoutes } from "./public.routes";

export function WebRoutes() {
  const { user } = useAuth();

  return (
    <Router >
      {user?.id ?
        <AuthRoutes />

        :
        <PublicRoutes />
      }
    </Router>
  )
}