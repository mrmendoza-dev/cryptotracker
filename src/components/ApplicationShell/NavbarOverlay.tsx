import { faGithub, faLinkedin, faXmark } from "@/assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import logo from "/images/logo.png";

const NavbarOverlay = forwardRef((props, ref) => {
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
      className="flex flex-col justify-start text-base h-screen fixed left-0 top-0 z-[999999999] m-0 
        transition-all duration-200 overflow-hidden whitespace-nowrap bg-white dark:bg-gray-900"
      style={{ width: isToggled ? "100vw" : "0px" }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between -mr-3">
          <Link
            to="/"
            className="flex items-center gap-1 select-none"
            onClick={toggleOverlay}
          >
            <img src={logo} alt="Logo" className="w-[30px] rounded-full" />
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-[-2px]">
              CryptoTracker
            </p>
          </Link>
          <button
            onClick={toggleOverlay}
            className="outline-none border-none bg-transparent text-base text-gray-500 dark:text-gray-400"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mt-5 flex flex-col gap-4 text-base font-semibold">
          <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
            <Link
              className="text-gray-900 dark:text-gray-100"
              to="/"
              onClick={toggleOverlay}
            >
              Cryptocurrencies
            </Link>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
            <Link
              className="text-gray-900 dark:text-gray-100"
              to="/portfolio"
              onClick={toggleOverlay}
            >
              Portfolio
            </Link>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
            <Link
              className="text-gray-900 dark:text-gray-100"
              to="/widgets"
              onClick={toggleOverlay}
            >
              Widgets
            </Link>
          </div>
        </div>

        {/* Account Buttons */}
        <div className="flex flex-col gap-2 mt-5">
          <button
            className="w-full bg-blue-500 text-white font-semibold text-sm py-3 px-4 
            rounded-lg flex items-center justify-center"
          >
            Create an account
          </button>
          <button
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 
            font-semibold text-sm py-3 px-4 rounded-lg flex items-center justify-center"
          >
            Log In
          </button>
        </div>

        {/* Controls */}
        <div className="flex mx-auto mt-5 gap-2">
          <select
            className="flex-grow bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 
            font-semibold text-sm py-3 px-4 rounded-lg"
          >
            <option>English</option>
          </select>
          <select
            className="flex-grow bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 
            font-semibold text-sm py-3 px-4 rounded-lg"
          >
            <option>USD</option>
          </select>
          <ThemeToggle />
        </div>

        {/* Extra Links */}
        <div
          className="flex flex-col items-center text-sm font-semibold text-gray-500 
          dark:text-gray-400 w-[200px] mx-auto mt-5 gap-2"
        >
          <div className="flex items-center gap-2">
            <Link
              className="hover:text-gray-900 dark:hover:text-gray-100"
              to="/"
              onClick={toggleOverlay}
            >
              Request Form
            </Link>
            <span>&middot;</span>
            <Link
              className="hover:text-gray-900 dark:hover:text-gray-100"
              to="/"
              onClick={toggleOverlay}
            >
              Glossary
            </Link>
            <span>&middot;</span>
            <Link
              className="hover:text-gray-900 dark:hover:text-gray-100"
              to="/"
              onClick={toggleOverlay}
            >
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              className="hover:text-gray-900 dark:hover:text-gray-100"
              to="/"
              onClick={toggleOverlay}
            >
              GitHub
            </Link>
            <span>&middot;</span>
            <Link
              className="hover:text-gray-900 dark:hover:text-gray-100"
              to="/"
              onClick={toggleOverlay}
            >
              About
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div
          className="flex justify-center items-center gap-2 text-xl text-gray-500 
          dark:text-gray-400 mt-5"
        >
          <a
            href="https://github.com/mrmendoza171/cryptotracker"
            target="_blank"
            rel="noopener"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/mrmendoza-dev/"
            target="_blank"
            rel="noopener"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
});

// Add display name for dev tools
NavbarOverlay.displayName = "NavbarOverlay";

export default NavbarOverlay;