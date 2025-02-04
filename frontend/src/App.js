import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/logout";
import Register from "./pages/register/Register";
import { ToastContainer } from "react-toastify";
import Shop from "./pages/Shop/Shop";
import About from "./pages/Aboutus/About";
import Admin from "./pages/admin/admin";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import Favorites from "./pages/favorites/Favoritespage";
import { FavoritesProvider } from "./Favorites/FavoritesContext";
import Profile from "./pages/Profile/Profile";
import "react-toastify/dist/ReactToastify.css";
import GiftCard from "./pages/GiftCards/GiftCard";
import ChangePassword from "./pages/change_password/ChangePassword";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:Id" element={<GiftCard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/logout" component={<Logout />} />
          <Route path="/change_password" component={<ChangePassword />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />

          {/* Corrected Shop route */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
