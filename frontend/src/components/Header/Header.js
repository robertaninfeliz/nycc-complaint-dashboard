import "./Header.css";

function Header({ handleSignOut }) {
  return (
    <header className="dashboard__header">
      <div className="dashboard__logo">
        <img
          src="https://council.nyc.gov/wp-content/themes/wp-nycc/assets/images/nyc-seal-blue.png"
          alt="NYC Logo"
          className="logo"
        />
        <h1> New York City Council Complaint Dashboard</h1>
      </div>
      <button className="dashboard__sign-out" onClick={handleSignOut}>
        Sign out
      </button>
    </header>
  );
}

export default Header;
