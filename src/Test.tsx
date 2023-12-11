// // *************  SwitchToggle Test********

// // import React, { useState } from "react";
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
// // **************Loader Test*********

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
// import Notification from './components/notification/Notification'; // Adjust the import path based on your project structure
// import { AlertType } from './components/Alert/Alert'; // Import AlertType enum

// const Test: React.FC = () => {
//   return (
//     <div>
//       {/* <Notification alertType={AlertType.SUCCESS} title="Success Notification" /> */}
//       <Notification alertType={AlertType.DANGER} title="Danger Notification" description="Something went wrong!" />
//       {/* <Notification alertType={AlertType.WARNING} title="Warning Notification" description="Be cautious!" /> */}
      
//     </div>
//   );
// };

// export default Test;


// export default App;

// Import necessary dependencies
// import React from "react";
// import Alert, {AlertType} from "./components/Alert/Alert"; // Adjust the path based on your file structure

// const Test = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <Alert
//         alertType={AlertType.WARNING}
//         title="Success Alert"
//         description="This is a success message."
//         close={() => {}}
//       />
//     </div>
//   );
// };

// export default Test;


// ******************* Test Modal *********

// App.tsx

// import React, { useState } from 'react';
// import Modal, { Themes, ModalMarginTop, ModalSize } from './components/modal/Modal'; // Adjust the path based on your project structure

// const Test: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Open Modal
//       </button>

//       {isModalOpen && (
//         <Modal
//           title="Sample Modal"
//           backDrop={true}
//           theme={Themes.warning}
//           close={closeModal}
//           backDropClose={true}
//           widthSizeClass={ModalSize.medium}
//           displayClose={true}
//           padding={{ title: true, body: true, footer: true }}
//           marginTop={ModalMarginTop.medium}
//         >
//           {/* Content inside the modal */}
//           <p>This is the content of the modal.</p>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Test;

// ***************  file preview test************
import React, { useState } from "react";
// import FilePreview from "./components/FilePreview/FilePreview"; // Adjust the path accordingly

// const Test = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setSelectedFile(file);
//   };

//   const handleClose = () => {
//     setSelectedFile(null);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       {/* {selectedFile && (
//         <FilePreview
//           selectedFile={selectedFile}
//           onClose={handleClose}
//           isComponent={false}
//           className="your-custom-class"
//         />
//       )} */}
//     </div>
//   );
// };

// export default Test;


