import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Signin from "./pages/authentification/Signin";
import ForgotPassword from "./pages/authentification/ForgotPassword";
import ResetPassword from "./pages/authentification/ResetPassword";
import CreatePost from "./pages/posts/CreatePost";
import Posts from "./pages/posts/Posts";
import EditPost from "./pages/posts/EditPost";
import PostDetails from "./pages/posts/PostDetails";
import Candidats from "./pages/candidats/Candidats";
import CandidatDetails from "./pages/candidats/CandidatDetails";
import CandidatSpontanee from "./pages/candidats/CandidatSpontanee";
import CandidatureArchivier from "./pages/candidats/CandidatureArchivier";
import PostsArchivier from "./pages/posts/PostsArchivier";
import { useAuth } from "./Hooks/AuthContext";
import Protected from "./Protected";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import EditPassword from "./pages/profile/EditPassword";
import Settings from "./pages/settings/Settings";
import Dashboard from "./pages/Dashboard";
import ListUsers from "./pages/utilisateur/ListUsers";
import AddNewUser from "./pages/utilisateur/AddNewUser";
import Notfound from "./pages/Notfound";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Flowbite theme={{ theme }}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Authentification Router */}
          <Route path="/" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Admin Router dashboard */}

          <Route
            path="/dashboard/profile"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/dashboard/edit-profile"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <EditProfile />
              </Protected>
            }
          />
          <Route
            path="/dashboard/change-password"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <EditPassword />
              </Protected>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <Settings />
              </Protected>
            }
          />

          {/* Posts Router dashboard */}
          <Route
            path="/dashboard"
            element={
              <Protected isSignedIn={isLoggedIn}>
                {" "}
                <Dashboard />
              </Protected>
            }
            index
          />
          <Route
            path="/dashboard/posts"
            element={
              <Protected isSignedIn={isLoggedIn}>
                {" "}
                <Posts />
              </Protected>
            }
          />
          <Route
            path="/dashboard/post/create"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <CreatePost />
              </Protected>
            }
          />
          <Route
            path="/dashboard/post/edit/:id"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <EditPost />
              </Protected>
            }
          />
          <Route
            path="/dashboard/post/details/:id"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <PostDetails />
              </Protected>
            }
          />
          <Route
            path="/dashboard/posts/postsarchivier"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <PostsArchivier />
              </Protected>
            }
          />

          {/* Candidats Router dashboard */}
          <Route
            path="/dashboard/candidats"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <Candidats />
              </Protected>
            }
          />
          <Route
            path="/dashboard/candidat/details/:id"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <CandidatDetails />
              </Protected>
            }
          />
          <Route
            path="/dashboard/candidats/candidatspontanee"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <CandidatSpontanee />
              </Protected>
            }
          />
          <Route
            path="/dashboard/candidats/candidaturearchivier"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <CandidatureArchivier />
              </Protected>
            }
          />

        

          {/* Users Router dashboard */}
          <Route
            path="/dashboard/users"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <ListUsers />
              </Protected>
            }
          />
          <Route
            path="/dashboard/users/add"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <AddNewUser />
              </Protected>
            }
          />

          {/* 404 page */}
          <Route path="*" element={<Notfound/>} />

          
        </Routes>
      </BrowserRouter>
    </Flowbite>
  );
}

export default App;
