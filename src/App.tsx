// App.tsx

import React from "react";
import { NavBar } from "./components/TopNavBar/NavBar";// Update the path
import { Auth } from "./actions"; // Update the path

interface AppProps {}

const App: React.FC<AppProps> = () => {
  // Sample authentication data
  const auth: Auth = {
    isAuthenticated: true,
    loading: false,
    token: "your_token_here",
    user: {
    jwt: 'hhh',
   role: undefined,
     user_info: {
      full_name: "Edison UWIHANGANYE",
      sex:  null,
      dob:  null,
      nid:  null,
      email:  null,
      phone_numbers: '123',
      user_id: '123',
      username: 'edsn kvn ',
      created_by: 'legend',
      created_at: 'UR',
      updated_by:  null,
      updated_at: '111',
      archive: 'fuck',
      archive_by:  null,
      archive_at:  null,
      status: 'active',
      first_name:  null,
      middle_name:  null,
      last_name:  null,
     }
     
    },
  };

  const FC_Logout = () => {
    // Implement your logout logic here
    console.log("Logout you are signed out");
  };

  const setOpenVav = (status: boolean) => {
    // Implement your logic to set the navbar status here
    console.log(`Set navbar status to ${status ? "open" : "closed"}`);
  };


  return (
    <div>
      {/* Use the NavBar component here */}
      <NavBar
        auth={auth}
        FC_Logout={FC_Logout}
        setOpenVav={setOpenVav}
        sideNavbarStatus={false} 
      />

      {/* The rest of your app content */}
      {/* ... */}
    </div>
  );
};

export default App;
