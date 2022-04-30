import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Header from "./components/Header";
import AdminHome from "./screens/Admin/AdminHome";
import AdminHeader from "./screens/Admin/AdminHeader";
import EmployeeHome from "./screens/Employee/EmployeeHome";
import EmployeeHeader from "./screens/Employee/EmployeeHeader";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/employee"
          element={
            <>
              <EmployeeHeader></EmployeeHeader>
              <EmployeeHome></EmployeeHome>
            </>
          }
        ></Route>
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
          path="/auth/:adminError/:employeeError"
          element={
            <>
              <Header></Header>
              <Home></Home>
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
        />
      </Routes>
    </div>
  );
}

export default App;
