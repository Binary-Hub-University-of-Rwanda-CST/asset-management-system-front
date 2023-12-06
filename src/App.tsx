// App.tsx

import React from 'react';

function App() {
  return (
    <div className="flex items-center justify-center h-screen box-sizing">
      <div className="text-center bg-[#e1f3ff] p-20 shadow-lg ">
        <h1 className="text-2xl font-bold text-[#2d90d2]">
          UNIVERSITY OF RWANDA
        </h1>
        <h2 className="text-xl border-l pl-2 text-[#2a82d2] shadow-black">ASSET MANAGEMENT SYSTEM </h2>
      </div>
      <ul className=' flex bg-blue-300 p-5 '>
        <li>Chad </li>
        <li className='text-red-300'>Somalia  </li>
        <li>Andorra  </li>
        <li>Western Sahara </li>
        <li>Caribbean Netherlands  </li>
      </ul>
    </div>
  );
}

export default App;
