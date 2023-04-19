import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../store/store";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="hidden md:ml-6 md:flex md:items-center">
              <Link to="/viewproducts" style={{ color: "white" }}>
                <p className="mr-4 text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">
                  View Products
                </p>
              </Link>

              <Link to="/" style={{ color: "white" }}>
                <p className="mr-4 text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">
                  Add Products
                </p>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center">
            <div className="mr-4 text-gray-600">{user.username}</div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 rounded-lg focus:outline-none focus:shadow-outline-indigo hover:bg-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
