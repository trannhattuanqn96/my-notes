//src/routes/root.tsx
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
  import Home from "../pages/Home";
  import Login from "../pages/Login";
  import PrivateRoute from "./privateRouters";
  
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* protect routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>,
    ),
  );
  
  
  export default router;