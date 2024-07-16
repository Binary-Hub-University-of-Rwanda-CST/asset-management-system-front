import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { AiOutlineLogin, AiFillQuestionCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import TopNav from '../../components/LoginTopNav/TopNav';
import App from '../../App';
import Input from '../../components/Fragments/Input_backup';
import Alert, { AlertType } from '../../components/Alert/Alert';
import { FC_Login } from '../../actions';
import { RootState, AppDispatch } from '../../app/store';
import LoadingCircle from '../../components/Loading/LoadingCircle';
import axios from 'axios';
import { defaultState } from '../../reducers/auth.reducer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isCredentialValid = (credential: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(credential) || phoneRegex.test(credential);
  };

  const [user, setUser] =useState(defaultState.isAuthenticated);
  const handleLoginUser = async () => {
    if (!validateCredentials()) return;

    const loginData = {
      email: username,
      password: password,
    };

    setLoggingIn(true);

    try {
      const response = await axios.post('https://ur-assets-management-system-backend.onrender.com/api/v1/auth/login', loginData);

      setLoggingIn(false);

      if (response.data.message === 'Login Successful') {
        const token = response.data.data.token.access.token;
        const userData = response.data.data.user;

        // Save token and user data to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(true); 
        

        // Alternatively, you can dispatch an action to store token and user data in Redux store
        // dispatch(setToken(token));
        // dispatch(setUser(userData));

        console.log('Login successful!');
      } else {
        setLoginError('Login failed. Please check your credentials.');
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      setLoggingIn(false);
      setLoginError('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    }
  };

  const validateCredentials = (): boolean => {
    if (username.trim() === '') {
      setUsernameError('Email or Phone Number is Empty');
      setPasswordError(null);
      return false;
    }
    if (!isCredentialValid(username)) {
      setUsernameError('Please enter a valid email address or phone number.');
      setPasswordError(null);
      return false;
    }
    if (password.trim() === '') {
      setPasswordError('Please enter your password.');
      setUsernameError(null);
      return false;
    }
    return true;
  };

  return (
    <>
      {isAuthenticated ? (
        <App />
      ) : (
        <div className="min-h-screen flex flex-col">
          <TopNav />
          <div className="flex-grow flex items-center justify-center bg-dark-bg">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md animate__animated animate__backInUp animate__faster">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">Sign In</h2>
              </div>
              <form className="mt-8 space-y-4" onSubmit={(event) => {
                event.preventDefault();
                handleLoginUser();
              }}>
                <Input
                  title="Email or Phone Number"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(null);
                    setLoginError('');
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
                    setPasswordError(null);
                  }}
                  disabled={false}
                  icon={
                    showPassword ? (
                      <FaRegEyeSlash className="text-my-blue cursor-pointer" onClick={toggleShowPassword} />
                    ) : (
                      <FaRegEye className="text-my-blue cursor-pointer" onClick={toggleShowPassword} />
                    )
                  }
                  className="mb-4 font-bold"
                  error={passwordError}
                  onCloseError={() => setPasswordError(null)}
                />
                {loginError && (
                  <Alert
                    alertType={AlertType.WARNING}
                    title={loginError}
                    close={() => setLoginError('')}
                    className="animate__fadeIn text-red-600 bg-red-200"
                  />
                )}
                <div className="flex flex-row justify-between">
                  <h3 className="flex gap-1 items-center font-light hover:text-primary-800 hover:underline cursor-pointer text-sm">
                    <AiFillQuestionCircle className="text-my-blue" />
                    Forgot Password
                  </h3>
                  <button
                    type="submit"
                    className="flex flex-row gap-1 items-center bg-my-blue text-white px-5 py-2 rounded-md hover:bg-blue-600"
                    disabled={loggingIn}
                  >
                    <AiOutlineLogin />
                    {loggingIn ? 'Signing In...' : 'Sign In'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {loggingIn && <LoadingCircle title='Authenticating user' />}
        </div>
      )}
    </>
  );
};

export default Login;
