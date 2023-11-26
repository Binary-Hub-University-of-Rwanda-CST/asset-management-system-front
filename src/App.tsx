import React from 'react';
import FileUploadPreview from './components/FileUpload';
import ToggleSwitch from './components/Switch';


function App() {

  // this is sample code for test tailwind css
  // you can delete it while you start development 
  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <div className='font-bold text-[#2d90d2]' >
        <h1 className='text-center text-2xl'>UNIVERSITY OF RWANDA</h1>
        <h1 className='text-center text-xl border-l '> ASSET MANAGEMENT SYSTEM </h1>
        <FileUploadPreview/>
        <ToggleSwitch/>
      </div>
    </div>
    </>
  );
}

export default App;
