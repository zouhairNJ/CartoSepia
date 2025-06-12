import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { logout } from "../features/user";

const Navbar = () => {
  const dispatch = useDispatch();
  // const logout = async () => {
  //   await fetch("/api/logout", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });
  //   localStorage.removeItem("jwt");
  // };

  const { isAuthenticated, userToken } = useSelector((state) => state.user);

  const authLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Home">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/product">
          Products
        </NavLink>
      </li>
      <li className="nav-item" style={{ position: "absolute", right: 0 }}>
        <a className="nav-link" href="/" onClick={() => dispatch(logout())}>
          Lougout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Register">
          Register
        </NavLink>
      </li>
    </>
  );
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/Home"}>
          CartoSepia
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">{userToken ? authLinks : guestLinks}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
