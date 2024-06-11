

import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { AiOutlineLogin, AiFillQuestionCircle } from 'react-icons/ai';
import TopNav from '../../components/LoginTopNav/TopNav';
import App from '../../App';
import Input from '../../components/Fragments/Input_backup';
import axios from 'axios';
import { AuthData } from '../../utils/AuthData';
import { API_URL } from '../../utils/api';
import Alert, {AlertType} from '../../components/Alert/Alert';

function Login() {
  const [username, setUsername] = useState('');
  const [loginError, setloginError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isCredentialValid = (credential: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    return emailRegex.test(credential) || phoneRegex.test(credential);
  };

  function handleLoginUser()
  {
    const loginData = {
      "email": username,
      "password": password
    }
    setLoggingIn(true);
    axios.post(`${API_URL}/auth/login`, loginData, { withCredentials: false })
  .then(res => {
    setLoggingIn(false);
    console.log(res);
    // alert("Login successful");
    AuthData.isAuthenticated = true;
  })
  .catch(err => {
    setLoggingIn(false);
    console.log("Error-datch: ", err);
    // alert("Error: " + err.response.data.message);
    setloginError(err.response.data.message);
  });

  }
  const errorClose =()=>{
    console.log('');
  }
  // const handleLogin = async () => {
  //  if(username.trim() === ''){
  //   setUsernameError('Email or Phone Number is Empty');
  //   setPasswordError(null);
  //   return;
  //  }
  //   else if (!isCredentialValid(username)) {
  //     setUsernameError('Please enter a valid email address or phone number.');
  //     setPasswordError(null); // Clear password error
  //     return;
  //   }

  //   if (password.trim() === '') {
  //     setPasswordError('Please enter your password.');
  //     setUsernameError(null); // Clear username error
  //     return;
  //   } else {
  //     setSuccess(true);
  //   }

  //   try {
  //     // login logic
  //     console.log('Simulating login...');
  //     // const userData = await login(username, password);
  //     // Handle successful login (e.g., store user data in state or context)
  //     // console.log('Logged in:', userData);
  //     const loginData = {
  //       "email": username,
  //       "password": password
  //     }
  //     setLoggingIn(true);
  //     axios.post("http://localhost:9090/auth/login", loginData).
  //     then(res => console.log(res))
  //     .catch(err => console.error('Login failed:', err));
  //   } catch (error) {
  //     // Handle login error
  //     console.error('Login failed:', error);
  //   }
  // };

  return (
    <>
      {AuthData.isAuthenticated ? (
        <App />
      ) : (
        <div className="min-h-screen flex flex-col">
          <TopNav />
          <div className="flex-grow flex items-center justify-center bg-dark-bg">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md animate__animated animate__backInUp animate__faster">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">Sign In</h2>
              </div>
              <form className="mt-8 space-y-4" onSubmit={(event) => {event.preventDefault();}}>
                <Input
                  title="Email or Phone Number"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(null); // Clear username error on input change
                  }}
                  disabled={false}
                  className="mb-4 font-bold"
                  error={usernameError}
                  onCloseError={() => setUsernameError(null)}
                />
                <Input
                  title="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={false}
                  icon={
                    showPassword ? (
                      <FaRegEyeSlash className="text-my-blue cursor-pointer" onClick={toggleShowPassword} />
                    ) : (
                      <FaRegEye className="text-my-blue cursor-pointer " onClick={toggleShowPassword} />
                    )
                  }
                  className="mb-4 font-bold"
                  error={passwordError}
                  onCloseError={() => setPasswordError(null)}
                />
                {loginError !== "" &&
                 <Alert
                  alertType= {AlertType.WARNING}
                  title={loginError}
                    close={() => {setloginError( ""); }} 
                    className=' animate__fadeIn text-red-600 bg-red-200'
                    />}
                <div className="flex flex-row justify-between">
                  <h3 className="flex gap-1 items-center font-light hover:text-primary-800 hover:underline cursor-pointer text-sm">
                    <AiFillQuestionCircle className="text-my-blue" />
                    Forgot Password
                  </h3>
                  <button
                    type="button"
                    onClick={handleLoginUser}
                    className="flex flex-row gap-1 items-center bg-my-blue text-white px-5 py-2 rounded-md hover:bg-blue-600"
                  >
                    <AiOutlineLogin />
                    {loggingIn ? "Signing In..." :"Sign In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
