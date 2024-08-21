import axios from "axios";
import { createContext, useContext, useState } from "react";
import { API_BASE_URL } from "../constant/constant";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phonenum: "",
  });

  const login = async () => {
    try {
      setIsLoading(true);
      await axios
        .post(API_BASE_URL + "/admin/auth/login", formData, { withCredentials: true })
        .then((res) => {
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("user", JSON.stringify(res.data.user));
          setIsLoading(false);
          setLoggedIn(true);
          toast.success(res.data.message);


          setError("");
            window.location.href = "/dashboard";
        
        })
        .catch((err) => {
          setError(err.response.data.message);
          setIsLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  };

  const logout = async () => {
    await axios.get(API_BASE_URL + "/auth/logout", { withCredentials: true });
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("user");
    setLoggedIn(false);
    
  };
  

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        error,
        formData,
        login,
        logout,
        setFormData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
