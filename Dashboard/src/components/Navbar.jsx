import { IoPersonCircle } from "react-icons/io5";
import logo from "../assets/hrmaps.png";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import { useAuth } from "../Hooks/AuthContext";
import useFetch from "../Hooks/useFetch";
import { API_BASE_URL } from "../constant/constant";
import axios from "axios";

const Navbar = function () {
  const { logout} = useAuth();

  const { data:user } = useFetch(() =>
    axios.get(API_BASE_URL + "/profile/", { withCredentials: true })
  );
  

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#F8F9FA] dark:bg-gray-800 dark:border-gray-700">
      <div className="px-6 py-6 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
            <Link to="/dashboard">
              <img src={logo} className="h-7 sm:h-10 ml-3 sm:ml-16" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center ms-3">
              <div>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="User settings"
                      className="text-gray-500"
                      img={user.picture?.url}
                      rounded
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{user.fullName}</span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Link to="/dashboard/profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
