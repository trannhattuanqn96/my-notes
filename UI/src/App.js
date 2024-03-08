import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/authContext/AuthProvider";
import router from "./routers";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
