import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "flowbite-react";
import useFetch from "../../Hooks/useFetch";
import { API_BASE_URL } from "../../constant/constant";
import { MdError } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";



function ConfirmeEmail() {
  const params = useParams();

  function asyncList() {
    return axios.get(API_BASE_URL + "/auth/confirme/" + params.token, {
      withCredentials: true,
    });
  }

  const { data, isLoading, error } = useFetch(asyncList);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <div className="text-center">
          {" "}
          <Spinner />{" "}
        </div>
      ) : data ? (
        <>
        <IoCheckmarkDoneSharp style={{ fontSize: 100, color: "#be1721" }} />

          <p className="mt3">{data}</p>
          <Link to="/signin">
            <button className="p-3 mt-10 bg-primary  rounded-xl text-white">
            Aller à la page de connexion
            </button>
          </Link>
        </>
      ) : (
        error && (
          <>
            {" "}
            <MdError style={{ fontSize: 100, color: "#be1721" }} />
            <p className="mt-3">{error}</p>
            <Link to="/signin">
              <button className="p-3 mt-10 bg-primary  rounded-xl text-white ">
              Aller à la page de connexion
              </button>
            </Link>
          </>
        )
      )}
    </div>
  );
}

export default ConfirmeEmail;
