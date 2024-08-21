import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${API_BASE_URL}/auth/password/forgot`, { email })
      .then((res) => {
        toast.success(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center mt-28">
      <div className="mx-auto max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-gray-200 p-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h1 className="block text-2xl font-bold text-gray-700">
                Mot de passe oublié?
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Ne vous inquiétez pas, nous vous enverrons des instructions de
                réinitialisation.
              </p>
            </div>
            <div className="mt-6">
              {/* Form */}
              <form>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Adresse email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                        required=""
                        aria-describedby="email-error"
                      />
                      <div className="pointer-events-none absolute top-3 right-0 hidden items-center px-3 peer-invalid:flex">
                        <svg
                          className="h-5 w-5 text-rose-500"
                          width={16}
                          height={16}
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                      <p
                        className="mt-2 hidden text-xs text-rose-600 peer-invalid:block"
                        id="email-error"
                      >
                        Adresse électronique valide requise pour la récupération
                        du compte processus
                      </p>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    {loading && (
                      <div className="text-center">
                        <Spinner />
                      </div>
                    )}
                    
                  </div>
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-primary py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-500 "
                    type="submit"
                    onClick={handelSubmit}
                  >
                    Réinitialisation le mot de passe
                  </button>
                </div>
              </form>
              {/* /Form */}
            </div>
          </div>
        </div>
        <p className="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center">
          <span className="inline pr-3 text-sm text-gray-600">
          Vous souvenez-vous de votre mot de passe?
            <a
              className="font-medium text-blue-600 decoration-2 hover:underline"
              href="/"
            >
              {" "}
              Connectez-vous ici{" "}
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
