import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";
import "./Login.css";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const username = e.target.username.value;
    const password = e.target.password.value;
    const rememberMe = e.target.remember.checked;

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_LOGIN_ROUTE,
        {
          username,
          password,
        }
      );

      localStorage.setItem("authToken", response.data.token);

      if (rememberMe) {
        localStorage.setItem("username", username);
      } else {
        localStorage.removeItem("username");
      }

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Invalid username or password. Please try again.";
      setError(errorMessage);
      setPassword("");
      e.target.password.value = "";
      e.target.password.focus();
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          src="https://council.nyc.gov/wp-content/themes/wp-nycc/assets/images/nyc-seal-blue.png"
          alt="NYC Logo"
          className="logo"
        />
        <h1> New York City Council Complaint Dashboard</h1>
        <p>Access the NYC Council complaint management system</p>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              required
              defaultValue={localStorage.getItem("username") || ""}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="options">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="button" className="forgot-password-button">
              Forgot password?
            </button>
          </div>

          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>NYC Council Staff Only</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
