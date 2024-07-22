
import React, { useState, useEffect } from "react";
import Input from "../../components/Fragments/Input_backup";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Alert, {AlertType} from "../../components/Alert/Alert";
import { useDispatch, useSelector } from "react-redux"; 
import { changePassword} from "../../actions/changePassword.action";
import { RootState } from "../../app/store";
import Successfully from "../../components/Successfully/Successfully";
import LoadingCircle from "../../components/Loading/LoadingCircle";
import { resetChangePasswordState } from "../../actions/changePassword.action"; 

const ChangePassword: React.FC = () => {

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state: RootState) => state.changePassword);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Resert form after changing password 

  const resetForm = () => {
    setPasswordStates({
      currentPassword: { value: "", showPassword: false, error: "" },
      newPassword: { value: "", showPassword: false, error: "" },
      confirmPassword: { value: "", showPassword: false, error: "" },
    });
  };

  useEffect(() => {
    if (success) {
      setShowSuccessAlert(true); 
      resetForm(); 
    }
    if (error) {
      setShowErrorAlert(true);
    }
     // Clean up function to reset state when component unmounts
     return () => {
      dispatch(resetChangePasswordState());
    };
  }, [success, error]);



  const [passwordStates, setPasswordStates] = useState({
    currentPassword: {
      value: "",
      showPassword: false,
      error: "",
    },
    newPassword: {
      value: "",
      showPassword: false,
      error: "",
    },
    confirmPassword: {
      value: "",
      showPassword: false,
      error: "",
    },
  });
   
  
  
  const handleChangePassword = () => {
    const { newPassword, confirmPassword, currentPassword } = passwordStates;
    const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      newPassword.value
    );

    // Check if all input is empty
    if (!currentPassword.value && !newPassword.value && !confirmPassword.value) {
      setPasswordStates((prevState) => ({
        ...prevState,
        currentPassword: {
          ...prevState.currentPassword,
          error: "Current password is empty",
        },
        newPassword: {
          ...prevState.newPassword,
          error: "new password is empty",
        },
        confirmPassword: {
          ...prevState.confirmPassword,
          error: "comfirm Password is empty",
        },
      }));
      return;
    }
    // check if is any input is empty
    else if (!currentPassword.value ) {
      setPasswordStates((prevState) => ({
        ...prevState,
        currentPassword: {
          ...prevState.currentPassword,
          error: "Current password is empty",
        },
      
      }));
      return;
    }
    else if ( !newPassword.value  ) {
      setPasswordStates((prevState) => ({
        ...prevState,
        
        newPassword: {
          ...prevState.newPassword,
          error: "new password is empty",
        },
        
      }));
      return;
    }
    // Check if new password is the same as the old password
    else if (currentPassword.value === newPassword.value) {
      setPasswordStates((prevState) => ({
        ...prevState,
        currentPassword: {
          ...prevState.currentPassword,
          error: "Current password should not be the same as the new password",
        },
        newPassword: {
          ...prevState.newPassword,
          error: "Current password should not be the same as the new password",
        },
      }));
      return;
    }
    // check is new password is strong
    else
    if (!isStrongPassword) {
      setPasswordStates((prevState) => ({
        ...prevState,
        newPassword: {
          ...prevState.newPassword,
          error:
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        },
      }));
      return;
    }
    // check if comfirm password is empty
    else if ( !confirmPassword.value) {
      setPasswordStates((prevState) => ({
        ...prevState,
        
        confirmPassword: {
          ...prevState.confirmPassword,
          error: "comfirm Password is empty",
        },
      }));
      return;
    }
    // Check if new password and confirm password match
     if (newPassword.value !== confirmPassword.value) {
      setPasswordStates((prevState) => ({
        ...prevState,
        newPassword: {
          ...prevState.newPassword,
          error: "New password and confirm password don't match",
        },
        confirmPassword: {
          ...prevState.confirmPassword,
          error: "New password and confirm password don't match",
        },
      }));
      return;
    };
    
    

    dispatch(changePassword(currentPassword.value, newPassword.value) as any); 
  };

  const closeSuccessAlert = () => {
    setShowSuccessAlert(false);
    // Reset form or navigate away if needed
  };

  const closeErrorAlert = () => {
    setShowErrorAlert(false);
  }; 

  const toggleShowPassword = (field: keyof typeof passwordStates, event: React.MouseEvent) => {
    event.stopPropagation();
    setPasswordStates((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        showPassword: !prevState[field].showPassword,
      },
    }));
  };

  // const handleInputChange = (field: keyof typeof passwordStates, value: string) => {
  //   setPasswordStates((prevState) => ({
  //     ...prevState,
  //     [field]: {
  //       ...prevState[field],
  //       value: value,
  //       error: "", // Clear error when input changes
  //     },
  //   }));
  // }; 

  const inputTitles = ["Current Password", "New Password", "Confirm Password"];

  
return (
  <div className="flex w-full justify-center">
    {/* <Modal isOpen={isModalOpen} onClose={closeModal} title="Change Password"> */}
      <div className=" animate__animated animate__fast animate__zoomIn flex flex-col gap-5 w-[600px] p-5 bg-white rounded-xl mt-6">
        <h3 className=" text-2xl font-bold flex flex-row items-center gap-2 ">
          <RiLockPasswordLine className="text-5xl font-bold" />
           Change password</h3>
        {Object.keys(passwordStates).map((key, index) => (
          <Input
            key={key}
            title={inputTitles[index]}
            type={passwordStates[key as keyof typeof passwordStates].showPassword ? "text" : "password"}
            value={passwordStates[key as keyof typeof passwordStates].value}
            onChange={(e) =>
              setPasswordStates((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key as keyof typeof passwordStates],
                  value: e.target.value,
                  error: "", // Clear error when input changes
                },
              }))
            }
            disabled={false}
            
            error={passwordStates[key as keyof typeof passwordStates].error}
            onCloseError={() =>
              setPasswordStates((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key as keyof typeof passwordStates],
                  error: "",
                },
              }))
            }
            icon={
              passwordStates[key as keyof typeof passwordStates].showPassword ? (
                <FaRegEyeSlash
                  onClick={(e) => toggleShowPassword(key as keyof typeof passwordStates, e)}
                  className="text-my-blue"
                />
              ) : (
                <FaRegEye
                  onClick={(e) => toggleShowPassword(key as keyof typeof passwordStates, e)}
                  className="text-my-blue"
                />
              )
            }
          />
        ))}

        {showErrorAlert && (
        <Alert
          alertType={AlertType.DANGER}
          title={error || "An error occurred"}
          close={closeErrorAlert}
          className=" bg-danger" 
        />
      )}
        <button
          onClick={handleChangePassword}
          className="bg-[#2d90d2] p-2 justify-center items-center text-white rounded-lg px-4 text-xl"
        >
          Change Password
        </button>
      </div>
      {loading && <LoadingCircle title="changing password "/>} 
   {/* Success Alert */}
   {showSuccessAlert && (
        <Successfully
          title="Password changed successfully!"
          onClose={closeSuccessAlert}
        />
      )}

      {/* Error Alert */}
        
  </div>
);
};

export default ChangePassword; 
