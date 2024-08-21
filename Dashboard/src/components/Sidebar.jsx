import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaHouseUser } from "react-icons/fa";

const SidebarComp = function () {
  const [currentPage, setCurrentPage] = useState("");
  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, [setCurrentPage]);

  const theme=  {
    root: {
      base: "h-full",
      
      collapsed: {
        on: "w-16",
        off: "w-64",
      },
      inner:
        "h-full w-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4",
    },
    collapse: {
      button:"group flex w-full items-center rounded-lg p-2 text-base  font-semibold text-gray-500 transition duration-75 hover:text-primary hover:bg-gray-100",
      active: "text-primary",
      icon: {
        base: `h-6 w-6 group text-gray-500 font-semibold transition duration-75 group-hover:text-primary group-active:text-primary`,
        open: {
          off: "text-gray-500",
          on: "text-primary",
        },
      },
      label: {
        base: "ml-3 flex-1 whitespace-nowrap  text-left",
        icon: {
          base: "h-6 w-6 transition delay-0 ease-in-out",
          open: {
            on: "rotate-180 text-primary",
            off: ""
          }
        }
      },
      list: "space-y-2 py-2",
    },
    item: {
      base: "flex group items-center justify-center rounded-lg p-2 text-base text-gray-500 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
      active: "text-primary ",
      collapsed: {
        insideCollapse:
          "w-full pl-8  hover:text-primary active:text-primary group-hover:text-primary transition duration-75",
        noIcon: "font-bold",
      },
      icon: {
        base: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 hover:text-primary group-hover:text-primary dark:text-gray-400 dark:group-hover:text-white",
        active: "text-primary",
        open: {
          off: "",
          on: "text-primary",
        },
      },
      label: "active:text-primary",
      listItem: "",
    },
    items: {
      base: "font-semibold hover:text-primary",
    },
    itemGroup: {
      base: "mt-4 space-y-2 border-t hover:text-primary border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    },
  };

  return (
    <Sidebar
      theme={theme}
      id="logo-sidebar"
      className="fixed flex justify-start mt-5 top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-[#F8F9FA] sm:translate-x-0"
      aria-label="Sidebar with multi-level dropdown example"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/dashboard"
            active={"/dashboard" === currentPage}
            icon={HiChartPie}
          >
            Tableau de bord
          </Sidebar.Item>
          <Sidebar.Collapse
            icon={MdOutlineWork}
            label="Les Offres"
            className={
              currentPage.includes("/dashboard/post")
                ? " text-primary"
                : ""
            }
          >
            <Sidebar.Item
              href="/dashboard/post/create"
              active={"/dashboard/post/create" === currentPage}
            >
              Créer une offre
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/posts"
              active={"/dashboard/posts" === currentPage}
            >
              Liste des offre
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/posts/postsarchivier"
              active={"/dashboard/posts/postsarchivier" === currentPage}
            >
              Les offres archivier
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={BsFillPeopleFill}
            label="Les Candidatures"
            className={
              currentPage.includes("/dashboard/candidats")
                ? " text-primary "
                : ""
            }
          >
            <Sidebar.Item
              href="/dashboard/candidats"
              active={"/dashboard/candidats" === currentPage}
            >Liste des candidatures

            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/candidats/candidatspontanee"
              active={"/dashboard/candidats/candidatspontanee" === currentPage}
            >Candidatures spontanée
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/candidats/candidaturearchivier"
              active={
                "/dashboard/candidats/candidaturearchivier" === currentPage
              }
            >Candidatures archivier
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item
            href="/dashboard/users"
            active={"/dashboard/users" === currentPage}
            icon={FaHouseUser}
          >
            Administrateur
          </Sidebar.Item>

          <Sidebar.Item
            href="/dashboard/settings"
            active={"/dashboard/settings" === currentPage}
            icon={IoSettings}
          >
            Paramètres
          </Sidebar.Item>



        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
export default SidebarComp;
