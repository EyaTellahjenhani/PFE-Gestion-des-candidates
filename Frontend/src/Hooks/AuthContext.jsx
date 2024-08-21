import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from '../constant/constant';
import toast from "react-hot-toast";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName:'',
        email: '',
        password: '',
        phonenum: '',
    })


    const login = async () => {
        try {
            setIsLoading(true);
            await axios.post(API_BASE_URL+'/auth/login', formData , {withCredentials: true} 
              )
            .then((res) => {
                window.localStorage.setItem('isLoggedIn', true);
                window.localStorage.setItem('user',JSON.stringify(res.data.user));
                setIsLoading(false);
                setLoggedIn(true);
                toast.success(res.data.message);
                window.location.href = "/";

                setError("");
            }).catch((err) => {
                setError(err.response.data.message);
                toast.error(err.response.data.message);
                setIsLoading(false);
            }
            );

        } catch (error) {
            setError(error.response.data.message);
            toast.error(err.response.data.message);

            setIsLoading(false);
        }
    };

    const signup = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            await axios.post(API_BASE_URL+'/auth/signup', formData , {withCredentials: true} 
              )
            .then((res) => {
                setIsLoading(false);
                window.location.href = '/signin';
                toast.success(res.data.message);
                setError("");

            }).catch((err) => {
                setError(err.response.data.message);
                toast.error(err.response.data.message);
                setIsLoading(false);
            }
            );

        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
        }
    };


    const logout = async () => {
      await axios.get(API_BASE_URL+'/auth/logout',{withCredentials: true} );
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('user');
        setLoggedIn(false);
        window.location.href = '/signin';
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn,isLoading,error,formData,signup, login, logout, setFormData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
