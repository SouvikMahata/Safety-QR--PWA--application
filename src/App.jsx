import React from "react";
import { RouterProvider } from "react-router-dom";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
    return <RouterProvider router={AllRoutes} />;
}

export default App;