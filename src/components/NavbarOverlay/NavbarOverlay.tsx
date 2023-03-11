
import logo from "./logo.png";
import "./NavbarOverlay.css";
import DarkMode from "../DarkMode/DarkMode";
import { Link } from "react-router-dom";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";


function NavbarOverlay(props: any, ref: any) {
  const [isToggled, setIsToggled] = useState(false);


  const toggleOverlay = () => {
    setIsToggled(!isToggled);
  };

    useImperativeHandle(ref, () => ({
      toggleOverlay: toggleOverlay,
    }));

  return (
    <div className="NavbarOverlay">


      <div className="Sidebar" style={{ width: isToggled ? "100vw" : "0px" }}>
        <div className="wrap">
          <div className="header">
            <Link className="nav-link" to="/" onClick={toggleOverlay}>
              CryptoTracker
            </Link>
            <button onClick={toggleOverlay} className="btn-exit">
              <FontAwesomeIcon icon={icons.faXmark} />
            </button>
          </div>

          <div className="directory">
            <div className="nav-item">
              <Link className="nav-link" to="/" onClick={toggleOverlay}>
                Cryptocurrencies
              </Link>
            </div>
            <div className="nav-item">
              <Link
                className="nav-link"
                to="/portfolio"
                onClick={toggleOverlay}
              >
                Portfolio
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/news" onClick={toggleOverlay}>
                News
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/widgets" onClick={toggleOverlay}>
                Widgets
              </Link>
            </div>
          </div>

          <div className="accounts">
            <button className="btn-create">Create an account</button>
            <button className="btn-login">Log In</button>
          </div>

          <div className="control">
            <select className="select">
              <option>English</option>
            </select>
            <select className="select">
              <option>USD</option>
            </select>
            <DarkMode />
          </div>

          <div className="directory-extra">
            <div>
              <Link className="nav-link" to="/" onClick={toggleOverlay}>
                Request Form
              </Link>
              &middot;
              <Link className="nav-link" to="/" onClick={toggleOverlay}>
                Glossary
              </Link>
              &middot;
              <Link className="nav-link" to="/" onClick={toggleOverlay}>
                FAQ
              </Link>
            </div>
            <div>
              <Link className="nav-link" to="/" onClick={toggleOverlay}>
                GitHub
              </Link>
              &middot;
              <Link className="nav-link" to="/" onClick={toggleOverlay}>
                About
              </Link>
            </div>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/mrmendoza171/cryptotracker"
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon icon={icons.faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/mrmendoza171/"
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon icon={icons.faLinkedin} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(NavbarOverlay);
