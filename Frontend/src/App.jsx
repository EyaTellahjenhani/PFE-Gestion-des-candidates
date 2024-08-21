import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/authentification/Signup";
import Signin from "./pages/authentification/Signin";
import ForgotPassword from "./pages/authentification/ForgotPassword";
import ResetPassword from "./pages/authentification/ResetPassword";
import { useAuth } from "./Hooks/AuthContext";
import ConfirmeEmail from "./pages/authentification/ConfirmeEmail";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import OffreDetails from "./pages/offre/OffreDetails";
import Notfound from "./pages/Notfound";
import CandidateForm from "./pages/candidat/CandidateForm";
import ContactPage from "./pages/contact/ContactPage";
import MesDemandes from "./pages/candidat/MesDemandes";
import Protected from "./Protected";
import OffreList from "./pages/offre/OffreList";
import CandidateProfile from "./pages/profile/CandidateProfile";





function App() {

  const { isLoggedIn } = useAuth();



  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <Notfound />,
    },
    {
      path: "signin",
      element: <Signin />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password/:token",
      element: <ResetPassword />,
    }, {
      path: "confirme/:token",
      element: <ConfirmeEmail />,
    },
    {
      path: "offres",
      element: <OffreList />,
    },
    {
      path: "offre/:id",
      element: <OffreDetails />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
    {
      path: "candidature/:id",
      element: 
      <Protected isSignedIn={isLoggedIn}>
      <CandidateForm />
      </Protected>, 
    },
    {
      path: "contact",
      element: <ContactPage />,
    },
    {
      path: "mes-demandes",
      element:
        <Protected isSignedIn={isLoggedIn}>
          <MesDemandes />
        </Protected>,
    },
    {
      path: "candidate-profile",
      element:
        <Protected isSignedIn={isLoggedIn}>
          <CandidateProfile />
        </Protected>,
    },


  ]);

  return (
    <Flowbite theme={{ theme }}>
      <Toaster />
      <RouterProvider router={router} />
    </Flowbite>

  );
}

export default App;
