import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, PasswordField } from "../../components/reusables/reusable";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useResetPassword } from "./hooks";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { validationSchema } from "./Schema/validationSchema";

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
  const { handleReset,updatePassword } = useResetPassword();

  // handle backspace
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
  // code verify
  const handleOnReset = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setisPending(true);
    const concatenatedNumber = otp.join("");
    try {
      const response = await handleReset(concatenatedNumber, verificationEmail);
      setisPending(false);
      setunVerified(false);
      toast.success(response.data.message);
      setToken(response.data.token)
    } catch (err: any) {
      setisPending(false);
      toast.error(err.response.data.message);
    }
  };

  // password update
  const handleOnUpdate = async(values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    setisPending(true);
    try {
      const response = await updatePassword(values,token)
      setisPending(false);
      toast.success(response.data.message)
    } catch (err:any) {
      setisPending(false);
      if (err.response) toast.error(err.response.data.message);
      else toast.error(err.message);
    }
  };
  // on codefield change
  const handleOnChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    currentOTPIndex = index;
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    if (value) setactiveOTPIndex(currentOTPIndex + 1);
    setOtp(newOTP);
  };

  // formik validations
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values: { newPassword: string; confirmPassword: string }) => {
      handleOnUpdate(values);
    },
  });

  // on fieldchange
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };
  // back button
  const handleBack = (): void => {
    navigate("/resetpassword/email");
  };

  useEffect(() => {
    inputRef.current?.focus();
    const queryParams = new URLSearchParams(location.search);
    const myParam = queryParams.get("email") || null;
    setverificationEmail(myParam);
  }, [activeOTPIndex,location.search]);

  return (
    <div className="bg-greyBackground min-h-screen min-w-full flex items-center justify-center">
      <div className="bg-white w-full md:w-1/2 p-5 rounded-xl">
        <div className="upper flex items-center md:gap-40 sm:gap-10 gap-4 mb-10">
          <button
            className="bg-lightBlue px-4 py-2 rounded text-blue"
            onClick={handleBack}
          >
            <FontAwesomeIcon icon="arrow-left" className="me-2" />
            Back
          </button>
          <h1 className="grow text-2xl font-bold">Reset Password</h1>
        </div>
        <p>Verification Code</p>
        <div className=" flex items-center space-x-2 mt-2 mb-8">
          {otp.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOTPIndex ? inputRef : null}
                  type="number"
                  className="w-1/2 h-12 border-blue border-2 rounded bg-transparent
               outline-none text-center font-semibold text-xl
                spin-button-none focus:border-gray-700
                 text-gray-900 transition"
                  onChange={(e) => handleOnChange(e, index)}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  value={otp[index]}
                  disabled={!unVerified}
                />
                {index === otp.length - 1 ? null : (
                  <span className="w-2 py-0.5 bg-gray-400" />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {unVerified && (
          <div className="flex justify-center">
            <Button
              text="Verify Code"
              color="blue"
              size="64"
              loading_state={isPending}
              onClick={(e: React.MouseEvent) => handleOnReset(e)}
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
                touched= {formik.touched.newPassword}
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
                touched= {formik.touched.confirmPassword}
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
