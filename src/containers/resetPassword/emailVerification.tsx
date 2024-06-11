import React, { ChangeEvent, useState } from "react";
import { Button } from "../../components/reusables/reusable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/Fragments/Input_backup";
import { isValidEmail } from "../../utils/AxiosToken";
import { useEmailVerify } from "./hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { error } from "console";

export default function EmailVerification() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isPending, setisPending] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");
  const { handleVerify } = useEmailVerify();

  const handleEmailSent = async (): Promise<void> => {
    setEmailError("");
    if (isValidEmail(email)) {
      setisPending(true);
      try {
        const response = await handleVerify(email);
        setisPending(false);
        toast.success(response.data.message);
        navigate(`/resetpassword/reset?email=${email}`);
      } catch (err: any) {
        setisPending(false);
        if (err.response) toast.error(err.response.data.message);
        else toast.error(err.message);
      }
    } else {
      setEmailError("invalid email");
    }
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
  };
  const closeAlert = () =>{
    setEmailError('');
  }
  return (
    <div className="bg-greyBackground min-h-screen min-w-full flex items-center justify-center">
      <div className="reset-cont bg-white w-full md:w-1/2 p-5 rounded-xl mt-[-10%]">
        <div className="upper flex items-center mb-5 md:gap-40 sm:gap-10 gap-4">
          <button className="bg-lightBlue px-4 py-2 rounded text-blue">
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
