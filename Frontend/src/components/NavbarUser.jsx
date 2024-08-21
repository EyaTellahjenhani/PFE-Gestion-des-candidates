import React from "react";
import logo from "../assets/hrmaps.png";
import { Avatar, Button, Dropdown, Navbar, Spinner } from "flowbite-react";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../constant/constant";
import useFetch from "../Hooks/useFetch";

const NavbarUser = () => {
  const { logout, isLoggedIn } = useAuth();

  const { data:user, isLoading } = useFetch(() =>
    axios.get(API_BASE_URL + "/profile/", { withCredentials: true })
  );
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/" className="ml-4 sm:ml-14 mt-3 mb-3">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex gap-2 md:order-2 mr-4 sm:mr-14 mt-3 mb-3">
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                className="text-gray-500"
                img={user?.picture ? user?.picture.url : IoPersonCircle}
                rounded
              />
            }
          >
            {isLoading ? <Spinner/> : 
            <Dropdown.Header>
              <span className="block text-sm">{user?.fullName}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            }
            <Link to="/candidate-profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Item>Paramètres</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Button href="/signin" className="bg-primary">
            Commencer
            </Button>
          </>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className=" mt-3 mb-3">
        <Navbar.Link href="/" className="text-lg hover:text-primary">
          Accueil
        </Navbar.Link>
        <Navbar.Link href="/offres/" className="text-lg hover:text-primary">
          Offre
        </Navbar.Link>
        <Navbar.Link href={"/mes-demandes/" } className="text-lg hover:text-primary">
          Mes demandes
        </Navbar.Link>
        <Navbar.Link href={"/contact/" } className="text-lg hover:text-primary">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarUser;
