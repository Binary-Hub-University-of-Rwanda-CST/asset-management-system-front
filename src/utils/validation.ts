// import validUrl from 'valid-url';

export function validateEmail(email: string): any {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const FC_urlPatternValidation = (
  URL: string,
  callBack: (
    loading: boolean,
    res: {
      msg: string;
      type: "SUCCESS" | "ERROR";
    } | null
  ) => void
) => {
  callBack(true, null);

  const urlRegex = /https:\/\/elearning\.reb\.rw\/course\/view\.php\?id=\d+/;

  if (urlRegex.test(URL)) {
    callBack(false, {
      msg: "",
      type: "SUCCESS",
    });
  } else {
    callBack(false, {
      msg: urlRegex.test(URL) + "",
      type: "ERROR",
    });
  }
};

export const hasLowercase = (text: string) => /[a-z]/.test(text);
export const hasUppercase = (text: string) => /[A-Z]/.test(text);
export const hasNumber = (text: string) => /\d/.test(text);
export const hasSpecialCase = (text: string) => {
  var format = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]+/;
  return format.test(text);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  phoneNumber = phoneNumber.replace(/^\+/, "");

  if (/^07\d{8}$/.test(phoneNumber)) return true;
  if (/^\d{12}$/.test(phoneNumber)) return true;

  return false;
};
