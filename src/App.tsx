import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store"; 

// Components
import SideNavBar from "./components/SideNavBar/SideNavBar";
import NavBar from "./components/TopNavBar/NavBar";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import StockLoading from "./components/StockLoading/StockLoading";
import Footer from "./components/Footer/Footer"; 

// Containers
import Login from "./containers/authantication/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import ChangePassword from "./containers/changePassword/ChangePassword";
import StockDashboard from "./containers/StockManagement/StockDashbord";
import UploadStock from "./containers/StockManagement/UploadAssets/UploadAssets";
import RequestValidation from "./containers/AssetDistribution/Request/Components/RequestValidation";
import UserProfile from "./containers/profile/UserProfile";
import EmailVerification from "./containers/resetPassword/emailVerification";
import ResetPasswordForm from "./containers/resetPassword/resetPassword";
import Developers from "./components/Team/Developers";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Routes>
      <Route path="/login" element={
        <AuthWrapper>
          <Login />
        </AuthWrapper>
      } />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/meet-developers" element={<Developers />} /> 

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/asset-monitoring" element={<StockDashboard />} />
          <Route path="/upload-assets" element={<UploadStock />} />
          <Route path="/my-profile" element={<UserProfile />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/fake" element={<RequestValidation />} />
          <Route path="/stockloading" element={<StockLoading />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  return <>{children}</>;
};

const ProtectedRoute: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const AuthenticatedLayout: React.FC = () => {
  const [sideNavbarStatus, setSideNavbarStatus] = useState(true);
  const authData = useSelector((state: RootState) => state.auth);

  return (
    <div className="h-screen flex flex-col">
      <NavBar
        auth={authData}
        setOpenVav={setSideNavbarStatus}
        sideNavbarStatus={sideNavbarStatus}
      />
      <div className="flex h-full bg-gray-100 flex-row">
        <div>
          {sideNavbarStatus && (
            <SideNavBar
              setOpenVav={(status: boolean) => setSideNavbarStatus(status)}
              sideNavbarStatus={sideNavbarStatus}
              auth={authData}
            />
          )}
        </div>
        <div
          className={
            !sideNavbarStatus
              ? "flex flex-col overflow-y-auto mt-20  w-full ml-4"
              : "flex flex-col overflow-y-auto mt-20  ml-[270px] w-full"
          }
        >
          <Outlet />
      
        <Footer/>  
        </div>
      </div>
    </div>
  );
};

export default App; 