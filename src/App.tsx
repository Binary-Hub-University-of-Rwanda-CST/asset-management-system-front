import React, { useState, useEffect } from 'react';
import Loader from './components/Loader/loader'; 

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      
      <div className="flex items-center justify-center h-screen">
        <div className='font-bold text-[#2d90d2]'>
          <h1 className='text-center text-2xl'>UNIVERSITY OF RWANDA</h1>
          <h1 className='text-center text-xl border-l '> ASSET MANAGEMENT SYSTEM </h1>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <h1 style={{ backgroundColor: 'white', textAlign: 'center' }}>spinning changes</h1>
          <p style={{ backgroundColor: 'white', textAlign: 'center', color: 'green' }}> is loaded...</p>
        </div>
      )}
    </div>
  );
};

export default App;
