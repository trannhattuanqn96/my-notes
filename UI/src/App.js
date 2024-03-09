import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/authContext/AuthProvider";
import Router from "./routers";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Router()} />
    </AuthProvider>
  );
}

export default App;
