// Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { getUserInfo } from './AuthService';

const Dashboard: React.FC = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        // Handle error (e.g., redirect to login page)
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (

    <div> Loading....</div>
  );

};

export default Dashboard;
