import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/authContext/AuthProvider";
import Router from "./routers";
import { NextUIProvider } from "@nextui-org/react";
function App() {
    return (
        <NextUIProvider>
            <AuthProvider>
                <RouterProvider router={Router()} />
            </AuthProvider>
        </NextUIProvider>
    );
}

export default App;
