import { IconType } from "react-icons";
import { MdOutlineDashboard } from "react-icons/md";
import { UserAccessList } from "./userAccess";
import { BsDatabase } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiQrScan2Line } from "react-icons/ri";
import { CiViewTable } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { BiGroup } from "react-icons/bi";

export enum MENU_TYPE {
  NONE = "NONE",
  PROFILE = "PROFILE",
  ACTIVITIES = "ACTIVITIES",
  REPORTS = "REPORTS",
  SETTINGS = "SETTINGS",
  OTHERS = "OTHERS",
}

export interface NavigationInterface {
  title: string;
  url: string;
}

export interface SideNavigationSubmenuInterface {
  title: string;
  url: string;
  label: string;
  access: UserAccessList | "all";
}

export interface SideNavigationInterface {
  title: string;
  url: string;
  icon: IconType;
  label: string;
  menu_type: MENU_TYPE;
  access: UserAccessList | "all";
  subMenus: SideNavigationSubmenuInterface[];
}

export const PUBLIC: NavigationInterface[] = [
  {
    title: "Login",
    url: "/login",
  },
];


export const NON_AUTHENTICATED_MENUS: NavigationInterface[] = [

  {
    title: "Login",
    url: "/login",
  },
];


export const AUTHENTICATED_MENUS: SideNavigationInterface[] = [
  {
    icon: MdOutlineDashboard,
    title: "Dashboard",
    label: "Dashboard",
    url: "/dashboard",
    menu_type: MENU_TYPE.NONE,
    access: "all",
    subMenus: [],
  },
  {
    icon: BsDatabase,
    title: "Assets Stock",
    label: "Assets Stock",
    url: "/assets-stock",
    menu_type: MENU_TYPE.ACTIVITIES,
    access: "all",
    subMenus: [
      {
        title: "Stock",
        label: "Stock",
        url: "/assets-stock",
        access: "all",
      },
      {
        title: "Upload Stock",
        label: "Upload Stock",
        url: "/upload-stock",
        access: "all",
      },
    ],
  },
  {
    icon: IoShareSocialOutline,
    title: "Assets Distribution",
    label: "Assets Distribution",
    url: "/assets-monitoring",
    menu_type: MENU_TYPE.ACTIVITIES,
    access: "all",
    subMenus: [
      {
        title: "Monitoring",
        label: "Monitoring",
        url: "/assets-monitoring",
        access: "all",
      },
      {
        title: "My Requests",
        label: "My Requests",
        url: "/my-assets-requests",
        access: "all",
      },
      {
        title: "Requests Approval",
        label: "Requests Approval",
        url: "/assets-requests-approval",
        access: "all",
      },
    ],
  },
  {
    icon: RiQrScan2Line,
    title: "Assets Tracking",
    label: "Assets Tracking",
    url: "/assets-tracking",
    menu_type: MENU_TYPE.ACTIVITIES,
    access: "all",
    subMenus: [],
  },
  {
    icon: BiGroup,
    title: "Staff Management",
    label: "Staff Management",
    url: "/users-list",
    menu_type: MENU_TYPE.ACTIVITIES,
    access: "all",
    subMenus: [],
  },
  {
    icon: CiViewTable,
    title: "Reports",
    label: "Reports",
    url: "/reports",
    menu_type: MENU_TYPE.REPORTS,
    access: "all",
    subMenus: [],
  },
  {
    icon: FiUser,
    title: "My Profile",
    label: "My Profile",
    url: "/my-profile",
    menu_type: MENU_TYPE.PROFILE,
    access: "all",
    subMenus: [],
  },
  
  {
    icon: RiLockPasswordLine,
    title: "Change Password",
    label: "Change Password",
    url: "/change-password",
    menu_type: MENU_TYPE.PROFILE,
    access: "all",
    subMenus: [],
  },
 
];

export const menus_categories = (): { key: MENU_TYPE; title: string }[] => {
  const response: { key: MENU_TYPE; title: string }[] = [];
  for (const menu in MENU_TYPE) {
    response.push({
      key: menu as MENU_TYPE,
      title: menu === MENU_TYPE.PROFILE ? "profile" : MENU_TYPE.ACTIVITIES ? "activities" : " ",
    });
  }
  return response.filter((element) =>
    response.find((itm) => itm.key === element.key)
  );
};
