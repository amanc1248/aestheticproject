import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Header from "./components/Header";
import AdminHome from "./screens/Admin/AdminHome";
import AdminHeader from "./screens/Admin/AdminHeader";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/admin"
          element={
            <>
              <AdminHeader></AdminHeader>
              <AdminHome></AdminHome>
            </>
          }
        ></Route>
        <Route
          path="/"
          element={
            <>
              <Header></Header>
              <Home></Home>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
