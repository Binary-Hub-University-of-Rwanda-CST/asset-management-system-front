// App.tsx

import React from 'react';
import PdfPreview from './components/PdfPreview/PdfPreview';
import ImgPreview from './components/ImgPreview/ImgPreview';
import './AppStyle.css';

const testImg = require('./assets/images/UR_logo.png');
const test = require('./assets/pdf/cv.pdf');

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex-shrink-0">
        <img src={testImg} alt="University Logo" className="w-40 mr-0 ml-10" />
      </div>

      <h1 className="text-center text-3xl font-bold text-blue-500 my-4">
        ASSET MANAGEMENT SYSTEM
      </h1>

      <div className="bg-blue-500 p-2 mx-16 rounded-md overflow-hidden justify-center background_blue">
  <PdfPreview
    file_url={test}  
    class_name="your-custom-class"
    frame_title="Your Frame Title"
    setLoadingFile={(state) => console.log('Loading state:', state)}
    full_height={true}
    style={{ backgroundColor: 'white', border: '1px solid black' }}
  />
</div>



      <div className="flex items-center justify-center mt-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2d90d2]">
            UNIVERSITY OF RWANDA
          </h1>
          <h2 className="text-xl border-l pl-2">ASSET MANAGEMENT SYSTEM PDF PREVIEW</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
