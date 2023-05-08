import logo from "/images/logo.png";
import "./NavbarOverlay.scss";
import DarkMode from "../DarkMode/DarkMode";
import { Link } from "react-router-dom";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";

function NavbarOverlay(props: any, ref: any) {
  const [isToggled, setIsToggled] = useState(false);

  const toggleOverlay = () => {
    setIsToggled(!isToggled);

    if (!isToggled) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }
  };

  useImperativeHandle(ref, () => ({
    toggleOverlay: toggleOverlay,
  }));

  return (
    <div
      className="NavbarOverlay"
      style={{ width: isToggled ? "100vw" : "0px" }}
    >
      <div className="wrap">
        <div className="header-title flex header">
            <Link
              to="/"
              className="header-title flex nav-link"
              onClick={toggleOverlay}
            >
              <img src={logo} />
              <p>CryptoTracker</p>
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
            <Link className="nav-link" to="/portfolio" onClick={toggleOverlay}>
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
            href="https://www.linkedin.com/in/mrmendoza-dev/"
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon icon={icons.faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(NavbarOverlay);
