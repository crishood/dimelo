import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import User from "./pages/User";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const MainRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/feed" /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainRoutes children={<Landing />}></MainRoutes>}
        />
        <Route
          path="/register"
          element={<MainRoutes children={<Register />}></MainRoutes>}
        />
        <Route
          path="/login"
          element={<MainRoutes children={<Login />}></MainRoutes>}
        />
        <Route
          path="/feed"
          element={<PrivateRoute children={<Feed />}></PrivateRoute>}
        />
        <Route
          path="/search"
          element={<PrivateRoute children={<Search />}></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute children={<Profile />}></PrivateRoute>}
        />
        <Route
          path="/user/:artistName"
          element={<PrivateRoute children={<User />}></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
