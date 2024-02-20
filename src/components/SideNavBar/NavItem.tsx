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
  updateSelectedMenu: (selectedMenuLink: string) => void;
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

  const hasSubmenu = props.nav.subMenus.length > 0;


  return (
    <RRNavLink
      to={props.nav.url}
      className={
         props.selectedMenuLink === props.nav.url
          ? `${baseClass} flex flex-col justify-start  bg-blue-white font-bold text-my-blue animate__animated animate__fadeIn py-2 pl-3 bg-blue-500`
          : `${baseClass} flex flex-col justify-start  hover:  py-2 pl-3 text-gray-500 hover:text-black`
      }
      onClick={() => props.updateSelectedMenu(props.nav.url)}
    >

{/* <RRNavLink
      to={props.nav.url}
      className={
        props.selectedMenuLink === props.nav.url
          ? `${baseClass} flex flex-col justify-start bg-blue-white  text-my-blue animate__animated animate__fadeIn py-2 pl-3 bg-blue-500`
          : `${baseClass} flex flex-col justify-start  hover:bg-blue-white  py-2 pl-3 text-gray-500 hover:text-black`
      }
      onClick={() => props.updateSelectedMenu(props.nav.url)}
    > */}

      <div
        onClick={() => hasSubmenu && props.setSelectedMenu(props.nav.url)}
        className="flex flex-row items-center justify-between gap-2 w-full h-full group py-2 px-5 pr-3"
      >
        <div className="w-full flex flex-row items-center gap-2 ">
          <div className="text-lg">{<props.nav.icon />}</div>
          <span>{props.nav.title}</span>
        </div>
        {hasSubmenu && (
          <div className="">
            {props.selectedMenuLink === props.nav.url ? (
              <IoIosArrowUp className={`text-black mr-3`} />
            ) : (
              <IoIosArrowDown className={`text-gray-400 -mr-3`} />
            )}
          </div>
        )}
      </div>
      {hasSubmenu && props.selectedMenuLink === props.nav.url && (
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
                className={`${
                  props.selectedMenuLink === subMenu.url
                    ? `${baseClass} bg-primary-100 text-my-blue animate__animated animate__fadeIn py-2 pl-3 bg-blue-500`
                    : `${baseClass} hover:bg-blue-white  py-2 pl-3 text-gray-500 hover:text-black`
                } hover:bg-blue-white hover:font-bold ` }
                onClick={() => props.updateSelectedMenu(subMenu.url)}
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

