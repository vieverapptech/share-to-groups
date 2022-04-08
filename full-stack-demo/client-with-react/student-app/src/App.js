import { Outlet, Link } from "react-router-dom";
export default function App() {
  return (
    <div>
      <h1>Students App</h1>
      <nav>
        <Link to="/views">View Students</Link>
        <Link to="/admits">Admit Student</Link>
      </nav>
      <Outlet />
    </div>
  );
}