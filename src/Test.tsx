//*************  SwitchToggle Test********

// import React, { useState } from "react";
// import Switch from "./components/switch/Switch";

// const Test: React.FC = () => {
//   const [isSwitchOn, setIsSwitchOn] = useState(false);

//   const handleSwitchChange = () => {
//     setIsSwitchOn((prevValue) => !prevValue);
//   };

//   return (
//     <div className="container mx-auto mt-5">
//       <h1>Toggle Switch Example</h1>
//       <Switch value={isSwitchOn} onChange={handleSwitchChange} />
//       <p>{isSwitchOn ? "Switch is ON" : "Switch is OFF"}</p>
//     </div>
//   );
// };

// export default Test;
// **************Loader Test*********

// import React from 'react'
// import LoadingCircle from './components/Loading/Loader'
// function Test() {
//   return (
//     <div>
//       <LoadingCircle />
    
//     </div>
//   )
// }

// export default Test
// *************** Notification test ****

// import React from 'react';
// import Notification from './components/notification/Notification';

// const App: React.FC = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <Notification message="This is a success notification" type="success" />
//       <Notification message="This is an info notification" type="info" />
//       <Notification message="This is a warning notification" type="warning" />
//       <Notification message="This is an error notification" type="error" />
//     </div>
//   );
// };

// export default App;

// Import necessary dependencies
import React from "react";
import Alert, {AlertType} from "./components/Alert/Alert"; // Adjust the path based on your file structure

const Test = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Alert
        alertType={AlertType.WARNING}
        title="Success Alert"
        description="This is a success message."
        close={() => {}}
      />
    </div>
  );
};

export default Test;

