import "./Nav.css";
import { Link } from "react-router-dom";

export default function Footer(props: any) {
    return (
      <div className="Footer">
        <div className="footer-main">
          <p className="footer-copyright">
            © 2022 CryptoTracker. All rights reserved
          </p>
        </div>

        <div className="footer-dir">
          <div className="dir-col">
            <p className="dir-title">Products</p>
            <div className="dir-list">
              <p className="dir-item">
                <Link className="nav-link" to="/">
                  CryptoTracker
                </Link>
              </p>
              <p className="dir-item">
                <Link className="nav-link" to="/news">
                  CryptoNews
                </Link>
              </p>
              <p className="dir-item">
                <Link className="nav-link" to="/portfolio">
                  CryptoPortfolio
                </Link>
              </p>
              <p className="dir-item">
                <Link className="nav-link" to="/widgets">
                  CryptoWidgets
                </Link>
              </p>
            </div>
          </div>
          <div className="dir-col">
            <p className="dir-title">Company</p>
            <div className="dir-list">
              <p className="dir-item">
                <a
                  className="nav-link"
                  href="https://github.com/mrmendoza171"
                  target="_blank"
                >
                  Github
                </a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="">
                  About Us
                </a>
              </p>
            </div>
          </div>
          <div className="dir-col">
            <p className="dir-title">Support</p>
            <div className="dir-list">
              <p className="dir-item">
                <a className="nav-link" href="">
                  Request Form
                </a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="">
                  FAQ
                </a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="">
                  Glossary
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
