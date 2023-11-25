import React from 'react';
import PdfPreview from './components/PdfPreview/PdfPreview';
import ImgPreview from './components/ImgPreview/ImgPreview';
// import myResume from './assets/pdf/myResume.pdf';
const testImg = require('./assets/images/UR_logo.png');
const test = require('./assets/pdf/test.pdf');
function App() {

  // this is sample code for test tailwind css
  // you can delete it while you start development 
  return (
    <>
    <div className='w-10'>
      <ImgPreview imgLocation={testImg} />
    </div>

    <div className='bg-blue-500 h-20vh overflow-y-auto'>
      <PdfPreview pdfLocation={test}/>
    </div>
    
    <div className="flex items-center justify-center h-screen">
      <div className='font-bold text-[#2d90d2]' >
        <h1 className='text-center text-2xl'>UNIVERSITY OF RWANDA</h1>
        <h1 className='text-center text-xl border-l '> ASSET MANAGEMENT SYSTEM </h1>
      </div>
    </div>
    </>
  );
}

export default App;
