// Example usage in another component
import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      // ... your async logic

      // After the operation is complete, set isLoading to false
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? <Loader /> : <p>Your content goes here</p>}
    </div>
  );
};

export default MyComponent;
