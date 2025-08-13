import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400 gap-y-4">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Movie site. All rights reserved.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/"
            className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            About
          </Link>
        </div>

        <div className="flex items-center space-x-1">
          <span>Made</span>
          <span className="text-red-500">❤</span>
          <span>by Ellie</span>
        </div>
      </div>
    </footer>
  );
}
