import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constant/constant";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setErr("Password Doesn't Match");
      setIsLoading(true);
    } else {
      setIsLoading(true);
      await axios
        .put(`${API_BASE_URL}/auth/password/reset/${params.token}`,
          { password },
          { withCredentials: true }
        )
        .then((res) => {
          setIsLoading(false);
          navigate("/signin");
        })
        .catch((err) => {
          setErr(err.response.data.message);
          setIsLoading(false);
        });
    }
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
              Changer le mot de passe
              </h1>
            </div>
            <div className="mt-6">
              {/* Form */}
              <form>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label
                      htmlFor="new-password"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Nouveau mot de passe
                    </label>
                    <div className="relative">
                      <input
                        placeholder="••••••••"
                        type="new-password"
                        id="new-password"
                        name="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                        required=""
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <input
                        placeholder="••••••••"
                        type="confirm-password"
                        id="confirm-password"
                        name="confirm-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                        required=""
                      />
                    </div>
                  </div>
                  {/* /Form Group */}
                  {err && <p className="flex justify-center font-semibold text-sm text-primary">{err}</p>}

                  {isLoading && (
                    <div className="text-center">
                      <Spinner />
                    </div>
                  )}

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-primary py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-500 "
                  >
                    Réinitialiser le mot de passe
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
              href="#"
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

export default ResetPassword;
