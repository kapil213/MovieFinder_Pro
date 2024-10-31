import { Children } from "react";

function Logo() {
    return (
      <div className="logo">
        <span role="img">🍿</span>
        <h1 className="text-black">MovieFinder Pro</h1>
      </div>
    );
  }
export default function Navbar({ children }) {
    return (
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    );
  }