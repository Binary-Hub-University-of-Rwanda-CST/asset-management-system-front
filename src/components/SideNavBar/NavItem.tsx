import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { NavLink as RRNavLink } from 'react-router-dom';
import { SideNavigationInterface } from "../../config/AppNavigations";
import { isAccessAuthorized } from "../../config/userAccess";

interface NavItemProps {
  nav: SideNavigationInterface;
  selectedMenuLink: string;
  setSelectedMenu: (selectedMenuLink: string) => void;
  auth: Auth;
}
interface Auth{ 
  isAuthenticated?: boolean;
  user:{
    user_info:{
      full_name: string;
      phone_numbers?: string;
  };
  role:{
    role:string;
  }
}
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const baseClass =
    "flex flex-row items-center gap-2 pr-3 py-0 text-sm mr-3 rounded-r-full groupzz";

  // Define a helper function to generate the className based on the provided argument
  const generateClassName = (isActive: boolean) => {
    return isActive
      ? `${baseClass} bg-primary-100 text-my-blue animate__animated animate__fadeIn py-2 pl-3`
      : `${baseClass} hover:bg-my-blue py-2 pl-3 text-gray-500 hover:text-black`;
  };

  return (
    <RRNavLink
      to={props.nav.url}
      // activeClassName="active-link"
      className={
        props.selectedMenuLink === props.nav.url
          ? "flex flex-col gap-2 pr-0 text-sm text-my-blue rounded-r-md group font-bold animate__animated animate__fadeIn animate__faster"
          : ""
      }
    >
      <div
        onClick={() =>
          props.nav.subMenus.length > 0 && props.setSelectedMenu(props.nav.url)
        }
        className="flex flex-row items-center justify-between gap-2 w-full h-full group py-2 px-5 pr-3"
      >
        <div className="w-full flex flex-row items-center gap-2">
          <div className="text-lg">{<props.nav.icon />}</div>
          <span>{props.nav.title}</span>
        </div>
        {props.nav.subMenus.length > 0 && (
          <div>
            {props.selectedMenuLink === props.nav.url ? (
              <IoIosArrowUp className={`text-black mr-3`} />
            ) : (
              <IoIosArrowDown className={`text-gray-400 -mr-3`} />
            )}
          </div>
        )}
      </div>
      {props.nav.subMenus.length > 0 &&
        props.selectedMenuLink === props.nav.url && (
          <div className="font-normal border-l-4  border-blue-white text-black ml-5">
            {props.nav.subMenus
              .filter(
                (itm) =>
                  itm.access === "all" ||
                  isAccessAuthorized(props.auth, itm.access) === true
              )
              .map((subMenu, s) => (
                <NavLink
                  key={s + 1}
                  to={subMenu.url}
                  className={generateClassName(true)}
                >
                  <div>{subMenu.title}</div>
                </NavLink>
              ))}
          </div>
        )}
    </RRNavLink>
  );
};

export default NavItem;