import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { SideNavigationInterface } from "../../config/AppNavigations";
import { isAccessAuthorized } from "../../config/userAccess";
import { Auth } from "../../actions";

interface NavItemProps {
  nav: SideNavigationInterface;
  selectedMenuLink: string;
  setSelectedMenu: (selectedMenuLink: string) => void;
  auth: Auth;
}

const NavItem: React.FC<NavItemProps> = ({
  nav,
  selectedMenuLink,
  setSelectedMenu,
  auth,
}) => {
  const baseClass =
    "flex flex-row items-center gap-2 pr-3 py-0 text-sm mr-3 rounded-r-full group";

  const isActive = selectedMenuLink === nav.url;

  return (
    <NavLink
      to={nav.url}
      className={
        isActive
          ? "flex flex-col gap-2 pr-0 text-sm rounded-r-md group font-bold animate__animated animate__fadeIn animate__faster bg-primary-100 text-primary-800"
          : `${baseClass} hover:bg-primary-100`
      }
    >
      <div
        onClick={() =>
          nav.subMenus.length > 0 && setSelectedMenu(nav.url)
        }
        className="flex flex-row items-center justify-between gap-2 w-full h-full group py-2 px-5 pr-3"
      >
        <div className="w-full flex flex-row items-center gap-2">
          <div className="text-lg">{<nav.icon />}</div>
          <span>{nav.title}</span>
        </div>
        {nav.subMenus.length > 0 && (
          <div>
            {selectedMenuLink === nav.url ? (
              <IoIosArrowUp className="text-black mr-3" />
            ) : (
              <IoIosArrowDown className="text-gray-400 -mr-3" />
            )}
          </div>
        )}
      </div>
      {nav.subMenus.length > 0 &&
        selectedMenuLink === nav.url && (
          <div className="font-normal border-l-4 border-primary-100 text-black ml-5">
            {nav.subMenus
              .filter(
                (subMenu) =>
                  subMenu.access === "all" ||
                  isAccessAuthorized(auth, subMenu.access)
              )
              .map((subMenu, s) => (
                <NavLink
                  key={s + 1}
                  to={subMenu.url}
                  className={`${
                    isActive
                      ? "bg-primary-100 text-primary-800 animate__animated animate__fadeIn py-2 pl-3"
                      : "hover:bg-primary-100 py-2 pl-3 text-gray-500 hover:text-black"
                  } ${baseClass}`}
                >
                  <div>{subMenu.title}</div>
                </NavLink>
              ))}
          </div>
        )}
    </NavLink>
  );
};

export default NavItem;
