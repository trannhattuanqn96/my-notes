//src/routes/root.tsx
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./privateRouters";
import Notes from "../pages/Notes";
import DetailNote from "../pages/Notes/detail-note";

const Router = () => {
    const mynote = localStorage.getItem("mynote");
    console.log(mynote);
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                {/* for admin */}

                <Route path="/admin/login" element={<Login />} />

                {/* <Route path="/admin/login" element={<Login />} /> */}
                <Route element={<PrivateRoute />}>
                    <Route path="/admin/home" element={<Home />} />
                </Route>

                {/* for clien  */}
                <Route path="/notes" element={<Notes />} />
                <Route path="/notes/:id" element={<DetailNote />} />

                <Route path="*" element={<Navigate to="/notes" />} />
            </Route>
        )
    );
    return router;
};

export default Router;
