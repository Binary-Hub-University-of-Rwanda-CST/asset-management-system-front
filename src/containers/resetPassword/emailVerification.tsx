import React, { ChangeEvent, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { requestResetCode } from "../../actions/passwordReset.actions";
import { Button } from "../../components/reusables/reusable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/Fragments/Input_backup";
import { isValidEmail } from "../../utils/AxiosToken";
import { toast } from "react-toastify";

export default function EmailVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailSent = async (): Promise<void> => {
    setEmailError("");
    if (isValidEmail(email)) {
      setIsPending(true);
      try {
        const response = await dispatch(requestResetCode(email) as any);
        setIsPending(false);
        // Check if the response contains a success message
        if (response && response.message) {
          toast.success(response.message);
          navigate(`/reset-password?email=${email}`); 
        }
      } catch (err: any) {
        setIsPending(false);
        // Display error message from the server response
        if (err.response && err.response.data && err.response.data.message) {
          setEmailError(err.response.data.message);
          toast.error(err.response.data.message);
        } else {
          setEmailError("An error occurred. Please try again.");
          toast.error("An error occurred. Please try again.");
        }
      }
    } else {
      setEmailError("Invalid email");
    }
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
    // Clear error when user starts typing
    if (emailError) setEmailError("");
  };

  const closeAlert = () => {
    setEmailError('');
  }

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="bg-greyBackground min-h-screen min-w-full flex items-center justify-center">
      <div className="reset-cont bg-white w-full md:w-1/2 p-5 rounded-xl mt-[-10%]">
        <div className="upper flex items-center mb-5 md:gap-40 sm:gap-10 gap-4">
          <button 
            className="bg-lightBlue px-4 py-2 rounded text-blue"
            onClick={handleBack}
          >
            <FontAwesomeIcon icon="arrow-left" className="me-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </div>
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
            text="Send Email"
            color="blue"
            size="64"
            loading_state={isPending}
            onClick={handleEmailSent}
          />
        </div>
      </div>
    </div>
  );
}