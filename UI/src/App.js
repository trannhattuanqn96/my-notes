import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { RefeshProvider } from "./context/authContext/RefeshProvider";
import Router from "./routers";
import { NextUIProvider } from "@nextui-org/react";
function App() {
    return (
        <NextUIProvider>
            <RefeshProvider>
                <RouterProvider router={Router()} />
            </RefeshProvider>
        </NextUIProvider>
    );
}

export default App;
