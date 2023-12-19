//**************** TEST NAVBAR **********************************
import React, { useState } from "react";
import { NavBar } from "./components/TopNavBar/NavBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, useLocation } from "react-router-dom";
import EmailVerification from "./pages/resetPassword/emailVerification";
import ResetPasswordForm from "./pages/resetPassword/resetPassword";
import Reset from "./pages/resetPassword/reset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  library.add(fab, fas);
  const [sideNavbarStatus, setSideNavbarStatus] = useState(false);

  const auth = {
    isAuthenticated: true,
    user: {
      user_info: {
        full_name: "Edison UWIHANGANYE",
        phone_numbers: "+270-788-240-303",
      },
      role: {
        role: "Admin",
      },
    },
    loading: false, // Add loading property
    token: "yourAuthTokenHere", // Add token property
  };

  const FC_Logout = () => {
    // Your logout logic goes here
    console.log("Logging out...");
  };
  return (
    <div className="app font-nunito">
      <NavBar
        auth={auth}
        FC_Logout={FC_Logout}
        setOpenVav={setSideNavbarStatus}
        sideNavbarStatus={sideNavbarStatus}
      />
      <Routes>
        <Route path="/resetpassword/*" element={<Reset />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
