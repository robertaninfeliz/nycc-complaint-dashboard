import React from "react";
import "./Login.css";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

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

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>

          <div className="options">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="divider">
          <span>NYC Council Staff Only</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
