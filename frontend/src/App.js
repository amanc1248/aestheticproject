import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin">admin</Route>
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
