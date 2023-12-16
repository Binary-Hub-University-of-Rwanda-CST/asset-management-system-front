// ExampleComponent.tsx
import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import Input from "../../components/Fragments/Input";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const ChangePassword: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

    // Check if any input is empty
    if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
      setPasswordStates((prevState) => ({
        ...prevState,
        currentPassword: {
          ...prevState.currentPassword,
          error: "Input is empty",
        },
        newPassword: {
          ...prevState.newPassword,
          error: "Input is empty",
        },
        confirmPassword: {
          ...prevState.confirmPassword,
          error: "Input is empty",
        },
      }));
      return;
    }

    // Check if new password is the same as the old password
    if (currentPassword.value === newPassword.value) {
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
    }

    // logic for changing the password
    // Call API or function for changing the password
    // Reset the form and clear any errors
    setPasswordStates({
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

  return (
    <div className="flex w-full ">
      {/* <button
        onClick={openModal}
        className="p-2 border-my-blue  bg-white border-2 rounded-lg flex items-center justify-center  "
      >
        Change Password
      </button> */}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Change Password">
        <div className="flex flex-col gap-5 w-96 p-5 ">
          {Object.keys(passwordStates).map((key) => (
            <Input
              key={key}
              title={`${key.charAt(0).toUpperCase()}${key.slice(1)} Password`}
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
                    className="text-my-blue items-center"
                  />
                ) : (
                  <FaRegEye
                    onClick={(e) => toggleShowPassword(key as keyof typeof passwordStates, e)}
                    className="text-my-blue items-center"
                  />
                )
              }
            />
          ))}
            <button
              onClick={handleChangePassword}
              className="bg-[#2d90d2] p-2 justify-center items-center text-white rounded-lg px-4"
            >
              Change Password
            </button>
        </div>
      </Modal>
    </div>
  );
};

export default ChangePassword;
