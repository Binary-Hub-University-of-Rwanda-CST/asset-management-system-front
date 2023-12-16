

// import React from 'react';
// import ChangePassword from './containers/changePassword/ChangePassword';
// import Login from './containers/authantication/Login';
// import DashboardLoading from './components/CoomingSoon/CoomingSoon';
// function Test() {
//   return (
//     < Login />



//   );
// }

// export default Test;


    
// ***************** test side Nav********************

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import LoadingCircle from "./components/Loading/LoadingCircle";
import CoomingSoon from './components/CoomingSoon/CoomingSoon'
import MyTopNav from "./containers/MyTopNav/MyTopNav";
import ChangePassword from "./containers/changePassword/ChangePassword";

const App = () => {
  const [sideNavbarStatus, setSideNavbarStatus] = useState(true);

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
    loading: false, 
    token: "AuthTokenHere goes here", 
  };
  

  return (
    <>
    <MyTopNav/>
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Side Navigation Bar */}
        <SideNavBar
          auth={auth}
          setOpenVav={(status) => setSideNavbarStatus(status)}
          sideNavbarStatus={sideNavbarStatus}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Your main content goes here */}
          <Routes>
           <Route path="/change-password" Component={ChangePassword}/>
            
          </Routes>
        </div>
      </div>
    </Router>
    </>
  );
};

export default App;
