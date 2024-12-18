import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="w-full min-h-[300px] border-t border-gray-100 dark:border-gray-700 
      flex items-start justify-between p-6 max-w-inherit mx-auto
      md:flex-row flex-col-reverse gap-6"
    >
      {/* Main Footer Section */}
      <div className="flex flex-col h-full relative w-1/2 self-end md:self-end self-start">
        <p className="text-gray-500 dark:text-gray-400 whitespace-nowrap h-inherit">
          © {new Date().getFullYear()} CryptoTracker. All rights reserved
        </p>
      </div>

      {/* Directory Links Section */}
      <div className="flex justify-center gap-8 flex-wrap md:justify-center justify-start">
        {/* Products Column */}
        <div className="min-w-[100px] font-semibold">
          <p className="text-xl text-gray-900 dark:text-gray-100">Products</p>
          <div className="mt-4 leading-tight">
            <p className="mt-4">
              <Link
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 
                  transition-colors duration-200"
                to="/"
              >
                CryptoTracker
              </Link>
            </p>
            <p className="mt-4">
              <Link
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 
                  transition-colors duration-200"
                to="/portfolio"
              >
                CryptoPortfolio
              </Link>
            </p>
            <p className="mt-4">
              <Link
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 
                  transition-colors duration-200"
                to="/widgets"
              >
                CryptoWidgets
              </Link>
            </p>
          </div>
        </div>

        {/* Company Column */}
        <div className="min-w-[100px] font-semibold">
          <p className="text-xl text-gray-900 dark:text-gray-100">Company</p>
          <div className="mt-4 leading-tight">
            <p className="mt-4">
              <a
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 
                  transition-colors duration-200"
                href="https://github.com/mrmendoza-dev/cryptotracker"
                target="_blank"
                rel="noopener"
              >
                Github
              </a>
            </p>
            <p className="mt-4">
              <a
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 
                  transition-colors duration-200"
                href="https://github.com/mrmendoza-dev"
              >
                About
              </a>
            </p>
          </div>
        </div>

        {/* Support Column */}
        <div className="min-w-[100px] font-semibold">
          <p className="text-xl text-gray-900 dark:text-gray-100">Support</p>
          <div className="mt-4 leading-tight">
            <p className="mt-4">
              <a
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 
                  transition-colors duration-200"
                href=""
              >
                Request Form
              </a>
            </p>
            <p className="mt-4">
              <a
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 
                  transition-colors duration-200"
                href=""
              >
                FAQ
              </a>
            </p>
            <p className="mt-4">
              <a
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 
                  transition-colors duration-200"
                href=""
              >
                Glossary
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
