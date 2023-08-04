import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterDog from "./pages/RegisterDog";
import "./style.scss";
import { Home } from "./pages/Home/Home";
import MatchesContainer from "./components/Matches/MatchesContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registerDog" element={<RegisterDog />} />
      <Route path="/home" element={<Home />} />
      <Route path="/matches" element={<MatchesContainer />} />
    </Routes>
  );
}

export default App;
