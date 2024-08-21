import React, { useEffect } from "react";
import logo from "../../assets/hrmaps.png";
import backgroundImage from "../../assets/bgsignin.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthContext";

const Signin = () => {
  const { isLoggedIn, isLoading, error, formData, login, setFormData } =
    useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex justify-center mt-28">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img src={logo} alt="Logo" className="w-32 h-auto" />
          </div>
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Bienvenue !
          </p>
     <form>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Adresse e-mail
            </label>
            <input
              id="LoggingEmailAddress"
              onChange={handleChange}
              name="email"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Mot de passe
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Mot de passe oublié?
              </Link>
            </div>
            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            {error && (
              <p className="text-primary m-2 text-center text-sm font-semibold">{error}</p>
            )}

            <button
              disabled={isLoading}
              onClick={login}
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              {isLoading ? <> Se connecter...</> : <>Se connecter</>}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
