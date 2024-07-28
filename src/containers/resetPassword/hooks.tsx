import axios from "axios";

export const useEmailVerify = () => {
  const handleVerify = async (email: string) => {
    const result = await axios.post(
      `${process.env.API_URL}/auth/resetPassword`,
      { email }
    );
    return result;
  };
  return {
    handleVerify,
  };
};
export const useResetPassword = () => {
  const handleReset = async (userCode: string, email: string | null) => {
    const result = await axios
      .post(`${process.env.API_URL}/auth/verify-email/${email}`, {
        userCode,
      })
      return result;
  };
  const updatePassword = async (body:{newPassword: string, confirmPassword: string},token:string) => {
    const result = await axios
      .post(`${process.env.API_URL}/auth/updatePassword/${token}`,body)
      return result;
  };
  return {
    handleReset,
    updatePassword
  };
};
