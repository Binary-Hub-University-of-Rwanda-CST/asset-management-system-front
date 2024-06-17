import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import ChangePassword from "./containers/changePassword/ChangePassword";
import Login from "./containers/authantication/Login";
import { RootState, AppDispatch } from "./app/store";
import { FC_Logout } from "./actions";
import Dashboard from "./containers/Dashboard/Dashboard";
import NavBar from "./components/TopNavBar/NavBar";
import { StockDashboard } from "./containers/StockManagement/StockDashbord";
import UploadStock from "./containers/StockManagement/UploadStock/UploadStock";
import Monitoring from "./containers/AssetDistribution/Monitoring/Monitoring";
import MyRequests from "./containers/AssetDistribution/Request/MyRequests";
import RequestApproval from "./containers/AssetDistribution/Request/RequestApproval";
import AssetTracking from "./containers/AssetTracking/AssetTracking";
import DashboardLoading from "./components/DashboardLoading/DashboardLoading";
import CoomingSoon from "./components/CoomingSoon/CoomingSoon";
import Test from "./App.Test";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import RequestValidation from "./containers/AssetDistribution/Request/Components/RequestValidation";

const App = () => {
  const [sideNavbarStatus, setSideNavbarStatus] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  
  const handleLogout = () => {
    dispatch(FC_Logout()); // Dispatch the logout action to update the state
    setSideNavbarStatus(false);
    };
    
    const authData = useSelector((state: RootState) => state.auth);
    console.log(authData); 
    
  
  return (
    <>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div className="h-screen flex flex-col">
          <div>
            <NavBar
            auth={authData}
              setOpenVav={setSideNavbarStatus}
              sideNavbarStatus={sideNavbarStatus}
              FC_Logout={FC_Logout}
            />
          </div>

          {isAuthenticated && (
            <div className="flex h-full bg-gray-200 flex-row">
              {/* Side Navigation Bar */}
              <div>
                {sideNavbarStatus && (
                  <SideNavBar
                    setOpenVav={(status) => setSideNavbarStatus(status)}
                    sideNavbarStatus={sideNavbarStatus}
                    auth={authData}
                  />
                )}
              </div>

              <div
                className={
                  !sideNavbarStatus
                    ? "flex flex-col overflow-y-auto mt-20  w-full ml-4"
                    : " flex flex-col overflow-y-auto mt-20 ml-[270px] w-full"
                }
              >
                {/*  main Routes */}
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/change-password"
                    element={<ChangePassword />}
                  />
                  <Route path="/assets-stock" element={<StockDashboard />} />
                  <Route path="/upload-stock" element={<UploadStock />} />
                  <Route
                    path="/assets-monitoring"
                    element={<Monitoring />}
                  />
                  <Route
                    path="/my-assets-requests"
                    element={<MyRequests />}
                  />
                  <Route
                    path="/assets-requests-approval"
                    element={<RequestApproval />}
                  />
                  <Route
                    path="/assets-tracking"
                    element={<AssetTracking />}
                  />
                  <Route path="/reports" element={<Test />} />
                  <Route path="/users-list" element={<DashboardLoading />} />
                  <Route path="/my-profile" element={<CoomingSoon />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/fake" element={<RequestValidation />} />
                </Routes>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
