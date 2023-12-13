import axios from "axios";

export const APP_TOKEN_NAME = "fda_t_tosoweuhfsofo";

export const setAxiosToken = () => {
  if (localStorage[APP_TOKEN_NAME]) {
    axios.defaults.headers.common["Authorization"] =
      localStorage[APP_TOKEN_NAME];
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export function isValidEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (pattern.test(email)) {
    return true;
  } else {
    return false;
  }
}
