//src/routes/root.tsx
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import LogOut from "../pages/Login/logout";
import PrivateRoute from "./privateRouters";


const Router = () => {
  const mynote = localStorage.getItem('mynote')
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={mynote ? <Navigate to="/home" /> : <Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>


        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<Login />} />
      </Route>,
    ),
  );
  return router
}



export default Router;