import "./App.css";
import Root from "./Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useState, useEffect } from "react";
import axiosInstance, { setAccessToken } from "./axiosInstance";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/tokens/refresh`)
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: "/",
          element: <HomePage user={user} />,
        },
        {
          path: "/signin",
          element: (
            <ProtectedRoute authUser={user.username} redirectTo={"/"}>
              <SigninPage setUser={setUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <ProtectedRoute authUser={user.username} redirectTo={"/"}>
              <SignupPage setUser={setUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
              <ProfilePage user={user} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

