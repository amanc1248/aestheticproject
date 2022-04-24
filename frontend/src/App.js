import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>home page</h1>}></Route>
        <Route path="/admin">admin</Route>
      </Routes>
    </div>
  );
}

export default App;
