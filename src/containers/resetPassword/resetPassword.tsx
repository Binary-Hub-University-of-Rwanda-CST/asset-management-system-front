import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, PasswordField } from "../../components/reusables/reusable";
import { useNavigate, useLocation } from "react-router-dom";
import { useResetPassword } from "./hooks";
import { useFormik } from "formik";
import { validationSchema } from "./Schema/validationSchema";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { verifyResetCode } from "../../actions/passwordReset.actions";
import { AppDispatch } from "../../app/store";
import Alert, { AlertType, AlertProps } from "../../components/Alert/Alert";

function ResetPasswordForm() {
  let currentOTPIndex: number = 0;
  const [unVerified, setunVerified] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTPIndex, setactiveOTPIndex] = useState<number>(0);
  const [isPending, setisPending] = useState<boolean>(false);
  const [verificationEmail, setverificationEmail] = useState<null | string>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleReset, updatePassword } = useResetPassword();
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<Omit<AlertProps, "close">>({
    alertType: AlertType.DEFAULT,
    title: "",
    description: "",
  });

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      const newOTP: string[] = [...otp];
      newOTP[currentOTPIndex] = "";
      setOtp(newOTP);
      setactiveOTPIndex(currentOTPIndex - 1);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleOnReset = async (): Promise<void> => {
    setisPending(true);
    const concatenatedNumber = otp.join("");

    if (!verificationEmail) {
      setAlertProps({
        alertType: AlertType.WARNING,
        title: "Missing Email",
        description: "Email is missing. Please try again.",
      });
      setShowAlert(true);
      setisPending(false);
      return;
    }

    try {
      const response = await dispatch(
        verifyResetCode(verificationEmail, concatenatedNumber)
      );
      setisPending(false);
      setunVerified(false);
      setAlertProps({
        alertType: AlertType.SUCCESS,
        title: "Verification Successful",
        description:
          response.data.message || "Your code has been verified successfully.",
      });
      setShowAlert(true);
      setToken(response.data.token);
      console.log('Token being used:', token); 
      
    } catch (err: any) {
      setisPending(false);
      let errorMessage = "An unexpected error occurred. Please try again.";
      let errorTitle = "Error";
      if (err.response) {
        errorMessage = err.response.data.message || err.response.statusText;
        errorTitle = `Error ${err.response.status}`;
        console.error("Error response:", err.response);
      } else if (err.request) {
        errorMessage = "No response received from server. Please try again.";
        errorTitle = "Network Error";
        console.error("Error request:", err.request);
      } else {
        errorMessage = err.message;
        console.error("Error message:", err.message);
      }
      setAlertProps({
        alertType: AlertType.DANGER,
        title: errorTitle,
        description: errorMessage,
      });
      setShowAlert(true);
    }
  };

  const handleOnUpdate = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log('Token being used:', token);
    console.log('values  being used:', values);
    setisPending(true);
     try {
    const response = await updatePassword(values, token); 
    setisPending(false);
    setAlertProps({
      alertType: AlertType.SUCCESS,
      title: "Password Updated",
      description: response.data.message || "Your password has been successfully updated.",
    });
    setShowAlert(true);
    // Optionally, redirect after a short delay
    setTimeout(() => {
      navigate('/login');  // or wherever you want to redirect
    }, 2000);
  } catch (err: any) {
      setisPending(false);
      let errorMessage = "An unexpected error occurred. Please try again.";
      let errorTitle = "Error";
      if (err.response) {
        errorMessage = err.response.data.message || err.response.statusText;
        errorTitle = `Error ${err.response.status}`;
        console.error('Error response:', err.response);
      } else if (err.request) {
        errorMessage = "No response received from server. Please try again.";
        errorTitle = "Network Error";
        console.error('Error request:', err.request);
      } else {
        errorMessage = err.message;
        console.error('Error message:', err.message);
      }
      setAlertProps({
        alertType: AlertType.DANGER,
        title: errorTitle,
        description: errorMessage,
      });
      setShowAlert(true);
    }
  }; 

  const handleOnChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    currentOTPIndex = index;
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    setOtp(newOTP);

    if (value) {
      
        setactiveOTPIndex(currentOTPIndex + 1);
      }
    
  }; 

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values: { newPassword: string; confirmPassword: string }) => {
      handleOnUpdate(values).catch((err) => {
        setAlertProps({
          alertType: AlertType.DANGER,
          title: "Error",
          description: "Failed to update password. Please try again.",
        });
        setShowAlert(true);
        console.error(err);
      });
    }, 
  });

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };

  const handleBack = (): void => {
    navigate("/email-verification"); 
  };

  useEffect(() => {
    inputRef.current?.focus();
    const queryParams = new URLSearchParams(location.search);
    const myParam = queryParams.get("email") || null;
    setverificationEmail(myParam);
  }, [activeOTPIndex, location.search]);

  const isOTPComplete = otp.every((digit) => digit !== "");

  return (
    <div className="bg-greyBackground min-h-screen min-w-full flex items-center justify-center p-4 "> 
      <div className="bg-white w-full md:w-1/2 p-5  rounded-xl flex flex-col gap-2 m-2  ">
          <div className="upper flex items-center md:gap-40 sm:gap-10 gap-4  border-b border-blue-white pb-1 ">
          <button
            className="bg-lightBlue px-2  py-1  rounded text-blue flex gap-2 items-center"
            onClick={handleBack}
          >
            <FaArrowAltCircleLeft className="me-2" />
            Back
          </button>
          <h1 className="grow text-xl font-bold ">Reset Password</h1>
        </div> 
        {unVerified && 
        <div>
        <div className=" flex flex-col  w-full  ">
          {/* <h3 className=" font-md font-bold  capitalize mb-2 ">check your email </h3> */}
          <p className=" text-sm text-gray-700 ">
            {" "}
            We've sent you verfication code <br />
            Please check your inbox at{" "}
            <span className="text-sm font-semibold ">
              {" "}
              {verificationEmail}{" "}
            </span>
          </p>
        </div>
        <div>
          <p className=" text-md  font-bold ">Enter Verification Code</p>
          <div className="flex items-center space-x-2 mt-2 mb-8">
            {otp.map((_, index) => (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOTPIndex ? inputRef : null}
                  type="number"
                  className="w-1/2 h-10  border-blue   border-2 rounded bg-transparent
                 outline-none text-center font-semibold text-xl
                  spin-button-none focus:border-my-blue 
                   text-gray-900 transition disabled:bg-slate-400"
                  onChange={(e) => handleOnChange(e, index)}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  value={otp[index]}
                  disabled={!unVerified}
                />
                {index === otp.length - 1 ? null : (
                  <span className="w-2 py-0.5 bg-gray-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        </div>
        }  
        {showAlert && (
          <Alert
            {...alertProps}
            close={() => setShowAlert(false)}
            timeOut={5000}
            // className={`${alertProps.alertType == AlertType.DANGER && 'border border-red-700 bg-dangeR  '}}   
          />
        )}
        {unVerified && (
          <div className="flex justify-center">
            <Button
              text="Verify Code"
              color="blue"
              size="64"
              loading_state={isPending}
              onClick={handleOnReset}
              disabled={!isOTPComplete || isPending}
            />
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {!unVerified && (
            <div className="password">
              <div className="mb-8">
                <label htmlFor="email">New Password</label>
                <PasswordField
                  id="newPassword"
                  name="newPassword"
                  password={formik.values.newPassword}
                  onChange={handleFieldChange}
                  disabled={unVerified}
                  error={formik.errors.newPassword}
                  touched={formik.touched.newPassword}
                />
              </div>
              <div className="mb-8">
                <label>Re-enter New Password</label>
                <PasswordField
                  id="confirmPassword"
                  name="confirmPassword"
                  password={formik.values.confirmPassword}
                  onChange={handleFieldChange}
                  error={formik.errors.confirmPassword}
                  touched={formik.touched.confirmPassword}
                  disabled={unVerified}
                />
              </div> 
              <div className="flex justify-center">
                <Button
                  text="Reset Password"
                  color="blue"
                  size="64"
                  type="submit"
                  loading_state={isPending}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
