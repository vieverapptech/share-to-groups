import { Outlet, Link } from "react-router-dom";
export default function App() {
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'blue'
  };

  return (
    <div>
      <h1>Students App</h1>
      <nav>
      <Link to="/">Home</Link>
        <Link style={linkStyle} to="/views">View Students</Link>
        <Link style={linkStyle} to="/admits">Admit Student</Link>
      </nav>
      <Outlet />
    </div>
  );
}