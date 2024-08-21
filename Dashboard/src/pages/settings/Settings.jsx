import React, { useState } from "react";
import { Tabs } from "flowbite-react";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import LocationSettings from "./LocationSettings";
import CategorySettings from "./CategorySettings";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import { useSearchParams } from "react-router-dom";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const myParam = searchParams.get('q');


  const theme = {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      variant: {
        default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
        underline:
          "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
        pills:
          "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
        fullWidth:
          "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none  focus:text-primary disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        variant: {
          default: {
            base: "rounded-t-lg",
            active: {
              on: "bg-gray-100 text-primary dark:bg-gray-800 dark:text-primary",
              off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300",
            },
          },
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "active rounded-t-lg border-b-2 border-primary text-primary dark:border-primary dark:text-primary",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
          pills: {
            base: "",
            active: {
              on: "rounded-lg bg-cyan-600 text-white",
              off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
            },
          },
          fullWidth: {
            base: "ml-0 flex w-full rounded-none first:ml-0",
            active: {
              on: "active rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
              off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: {
      base: "",
      variant: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "py-3",
  };

  return (
    <NavbarSidebarLayout>
      <Breadcrumbe pageName1="Paramètres" />
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Paramètres</h2>
        <div className="grid grid-cols-1 gap-6 mt-4">
          <Tabs theme={theme} aria-label="Tabs with icons" variant="underline">
            <Tabs.Item active={myParam == "category"} title="Categories" icon={BiSolidCategory}>
              <CategorySettings />
            </Tabs.Item>
            <Tabs.Item active={myParam == "location"}  title="Localisation" icon={FaLocationDot}>
              <LocationSettings />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Settings;
