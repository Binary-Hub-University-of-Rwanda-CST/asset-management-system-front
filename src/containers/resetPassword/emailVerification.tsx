import React, { ChangeEvent, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { requestResetCode } from "../../actions/passwordReset.actions";
import { Button } from "../../components/reusables/reusable";
import Input from "../../components/Fragments/Input_backup";
import { isValidEmail } from "../../utils/AxiosToken";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Alert, { AlertType, AlertProps } from "../../components/Alert/Alert";

export default function EmailVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<Omit<AlertProps, "close">>({
    alertType: AlertType.DEFAULT,
    title: "",
    description: "",
  });

  const handleEmailSent = async (): Promise<void> => {
    setEmailError("");
    if (isValidEmail(email)) {
      setIsPending(true);
      try {
        const response = await dispatch(requestResetCode(email) as any);
        setIsPending(false);
        if (response && response.message) {
          setAlertProps({
            alertType: AlertType.SUCCESS,
            title: "Success",
            description: response.message,
          });
          setShowAlert(true);
          setTimeout(() => {
            navigate(`/reset-password?email=${email}`);
          }, 3000);  // 2 seconds delay
        }
      } catch (err: any) {
        setIsPending(false);
        const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
        setAlertProps({
          alertType: AlertType.DANGER,
          title: "Error",
          description: errorMessage,
        });
        setShowAlert(true);
        setEmailError(errorMessage);
      }
    } else {
      setEmailError("Invalid email");
    }
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
    if (emailError) setEmailError("");
  };

  const closeAlert = () => {
    setEmailError('');
    setShowAlert(false);
  }

  const handleBack = () => {
    navigate('/login');   
  };

  return (
    <div className="bg-greyBackground min-h-screen min-w-full flex items-center justify-center p-4 ">
      <div className="reset-cont bg-white w-full md:w-1/2 p-5 rounded-xl  flex  flex-col  gap-2   ">
        <div className="upper flex items-center mb-5 md:gap-40 sm:gap-10 gap-4">
          <button 
            className="bg-lightBlue px-4 py-1 font-bold  rounded text-blue  flex gap-2 items-center "
            onClick={handleBack}
          >
            <FaArrowAltCircleLeft   className="me-2" />
            Back
          </button>
          <h1 className="text-md  font-bold">Reset Password</h1>
        </div>
        <p className=" text-sm  text-black font-medium  ">Enter the email address  associated  with your account and we will send you a  code to  reset  your password  </p>
        <Input
          title={"Email"}
          type={"Email"}
          onChange={handleOnInputChange}
          value={email}
          error={emailError}
          disabled={false}
          onCloseError={closeAlert}
        />
        <div className="flex justify-center">
          <Button
            text="Continue With Email "
            color="blue"
            size="64"
            loading_state={isPending}
            onClick={handleEmailSent}
          />
        </div>
        {showAlert && (
          <Alert
            {...alertProps}
            close={closeAlert}
            timeOut={5000}
          />
        )}
      </div>
    </div>
  );
} 