// App.tsx

import React from 'react';
import urImage from './assets/images/UR_logo.png'

function App() {
  return (
<div className="flex items-center justify-center h-screen shadow-lg bg-[#e1f3ff]">
      <div className="text-center transition duration-300 ease-in-out p-10 bg-white rounded-lg">

      <img
          className="mx-auto mb-4 rounded-full"
          src={urImage}
          alt="University Logo"
          width="100"
          height="100"
        />
        <h1 className="text-blue-500 text-3xl">UNIVERSITY OF RWANDA</h1>
        <h2 className="text-blue-500 text-2xl">ASSET MANAGEMENT SYSTEM</h2>
      </div>
    </div>


  );
}

export default App;
