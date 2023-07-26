import "./App.css";
import SideBar from "./components/SideBar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import History from "./components/History";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SideBar />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
