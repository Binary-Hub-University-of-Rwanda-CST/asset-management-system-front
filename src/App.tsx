//**************** TEST NAVBAR **********************************

import React, { useState } from "react";
import { NavBar } from "./components/TopNavBar/NavBar";

const App = () => {
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
    <div>
      <NavBar
        auth={auth}
        FC_Logout={FC_Logout}
        setOpenVav={setSideNavbarStatus}
        sideNavbarStatus={sideNavbarStatus}
      />
    </div>

  );
};

export default App;


