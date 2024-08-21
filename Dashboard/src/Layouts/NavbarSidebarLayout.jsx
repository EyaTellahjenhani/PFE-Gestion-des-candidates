import Navbar from "../components/Navbar";
import SidebarComp from "../components/Sidebar";


const NavbarSidebarLayout = function ({ children }) {
  return (
    <div className="bg-[#F8F9FA] dark:bg-gray-800">
      <Navbar />
      <SidebarComp />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">{children}</div>
      </div>
    </div>
  );
};

export default NavbarSidebarLayout;
