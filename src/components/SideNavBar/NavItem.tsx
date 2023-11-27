import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { SideNavigationInterface } from "../../config/AppNavigations";
import { isAccessAuthorized } from "../../config/userAccess";
import { Auth } from "../../actions";

const NavItem = (props: {
  nav: SideNavigationInterface;
  selectedMenuLink: string;
  setSelectedMenu: (selectedMenuLink: string) => void;
  auth: Auth;
}) => {
  const baseClass =
    "flex flex-row items-center gap-2 pr-3 py-0 text-sm mr-3 rounded-r-full group";
  return (
    <NavLink
      to={props.nav.url}
      className={
        props.selectedMenuLink === props.nav.url
          ? "flex flex-col gap-2 pr-0 text-sm rounded-r-md group font-bold animate__animated animate__fadeIn animate__faster"
          : (isActive) =>
              isActive 
                ? `${baseClass} bg-primary-100 text-primary-800`
                : `${baseClass} hover:bg-primary-100`
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
          <div className="font-normal border-l-4 border-primary-100 text-black ml-5">
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
                  className={(isActive) =>
                    isActive
                      ? `${baseClass} bg-primary-100 text-primary-800 animate__animated animate__fadeIn py-2 pl-3`
                      : `${baseClass} hover:bg-primary-100 py-2 pl-3 text-gray-500 hover:text-black`
                  }
                >
                  {/* <div></div> */}
                  <div>{subMenu.title}</div>
                </NavLink>
              ))}
          </div>
        )}
    </NavLink>
  );
};

export default NavItem;
