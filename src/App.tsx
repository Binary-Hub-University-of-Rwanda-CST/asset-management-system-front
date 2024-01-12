import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import ChangePassword from "./containers/changePassword/ChangePassword";
import Login from "./containers/authantication/Login";
import { AuthData } from "./utils/AuthData";
import Dashboard from "./containers/Dashboard/Dashboard";
import { NavBar } from "./components/TopNavBar/NavBar";
import { StockDashboard } from "./containers/StockManagement/StockDashbord";
import "react-toastify/dist/ReactToastify.css";
import UploadStock from "./containers/StockManagement/UploadStock/UploadStock";
import Monitoring from "./containers/AssetDistribution/Monitoring/Monitoring";
import MyRequests from "./containers/AssetDistribution/Request/MyRequests";
import RequestApproval from "./containers/AssetDistribution/Request/RequestApproval";

const App = () => {
  const [sideNavbarStatus, setSideNavbarStatus] = useState(true);


  const FC_Logout = () => {
    AuthData.isAuthenticated = false;
    console.log('Signing out...');
    console.log(AuthData.isAuthenticated);
  };

  return (
    <>
      {!AuthData.isAuthenticated ? (
        <Login />
      ) : (
        <>
          <div>
            <NavBar
              auth={AuthData}
              FC_Logout={FC_Logout}
              setOpenVav={setSideNavbarStatus}
              sideNavbarStatus={sideNavbarStatus}
            />
          </div>

          {AuthData.isAuthenticated && (
            <div className="flex h-screen bg-gray-100">
              {/* Side Navigation Bar */}
              <SideNavBar
                auth={AuthData}
                setOpenVav={(status) => setSideNavbarStatus(status)}
                sideNavbarStatus={sideNavbarStatus}
              />
              {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/*  main content goes here */}
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/change-password"
                      element={<ChangePassword />}
                    />
                   <Route path="/assets-stock" element ={<StockDashboard/>}/>
                   <Route path="/upload-stock" element ={<UploadStock/>}/>
                   <Route path="/assets-monitoring" element ={<Monitoring/>}/>
                   <Route path="/my-assets-requests" element ={<MyRequests/>}/>
                   <Route path="/assets-requests-approval" element ={<RequestApproval/>}/>
                    <Route path="/" element={<Dashboard />} />
                  </Routes>
                </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default App;
