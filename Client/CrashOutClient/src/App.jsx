import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CrashList from "./pages/CrashList";
import CreateCrash from "./pages/CreateCrash";
import Home from "./pages/Home";
import CrashDetails from "./pages/CrashDetails";
import EditCrash from "./pages/EditCrash";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crashes" element={<CrashList />} />
        <Route path="/crashes/:id" element={<CrashDetails />} />
        <Route path="/create" element={<CreateCrash />} />
        <Route path="/crashes/edit/:id" element={<EditCrash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;