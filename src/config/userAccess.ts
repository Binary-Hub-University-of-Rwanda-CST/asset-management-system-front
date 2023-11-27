import { Auth } from "../actions";

export enum UserAccessList {
  VIEW_ASSETS = "VIEW_ASSETS", // Example of access
}

export const isAccessAuthorized: any = (
  auth: Auth,
  access: UserAccessList
): boolean => {
  if (auth.user === null || auth.user.role === undefined) {
    return false;
  }
  if (auth.user.role.access.find((itm) => itm === access) !== undefined) {
    return true;
  }
  return false;
};
