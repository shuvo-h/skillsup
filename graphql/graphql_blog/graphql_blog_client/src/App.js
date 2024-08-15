import logo from './logo.svg';
import './App.css';
import { NavLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <main>
      <nav style={{display:"flex", gap:"1rem"}}>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/posts"}>Posts</NavLink>
        <NavLink to={"/login"}>Login</NavLink>
        <NavLink to={"/register"}>Register</NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
