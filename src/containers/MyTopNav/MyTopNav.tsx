import React, { useState } from "react";
import { NavBar } from "../../components/TopNavBar/NavBar";
import { AuthData } from "../../utils/AuthData";

const MyTopNav = () => {
  const [sideNavbarStatus, setSideNavbarStatus] = useState(false);


  const FC_Logout = () => {
AuthData.isAuthenticated = false;
console.log('sinning out......!');
  };

  return (
    <div>
      <NavBar
        auth={AuthData}
        FC_Logout={FC_Logout}
        setOpenVav={setSideNavbarStatus}
        sideNavbarStatus={sideNavbarStatus}
      />
    </div>
  );
};

export default MyTopNav;