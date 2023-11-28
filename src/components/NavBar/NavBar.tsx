import React, { Component } from "react";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import UR_LOGO from "../../assets/images/UR_logo.png";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoMdLogIn } from "react-icons/io";
import { Auth } from "../../actions";
import { RiComputerLine, RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TbArrowsDiagonalMinimize2 } from "react-icons/tb";

interface NavBarProps {
  auth: Auth;
  FC_Logout: () => void;
  setOpenVav: (status: boolean) => void;
  sideNavbarStatus: boolean;
  SwitchEmployment: () => void;
}
interface NavBarState {
  view_user: boolean;
  loading: boolean;
}

export class NavBar extends Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);

    this.state = {
      loading: false,
      view_user: false,
    };
  }
  componentDidMount(): void {}
  render() {
    return (
      <div>
        <div
          className={`${
            this.props.auth.isAuthenticated === false
              ? "bg-white"
              : " bg-white text-black"
          } py-1 pl-3 fixed top-0 right-0 left-0 z-50 border-b shadow-sm`}
        >
          <div
            className={`${
              this.props.auth.isAuthenticated === false
                ? "container mx-auto lg:px-10"
                : ""
            }`}
          >
            <div className="flex flex-row items-center justify-between gap-3">
              <div className="flex flex-row items-center gap-2">
                {this.props.auth.isAuthenticated === false && (
                  <div>
                    <img
                      className="h-14"
                      src={UR_LOGO}
                      alt="Asset Management System"
                    />
                  </div>
                )}

                {this.props.auth.isAuthenticated === false ? (
                  <div className="flex flex-row items-center gap-2">
                    <div className="text-primary-800 py-4 font-extrabold text-lg">
                      ASSET MANAGEMENT SYSTEM
                    </div>
                  </div>
                ) : (
                  <div className="my-2 flex flex-row items-center gap-3">
                    <div
                      onClick={() =>
                        this.props.setOpenVav(!this.props.sideNavbarStatus)
                      }
                      className="bg-primary-100 rounded-md p-2 cursor-pointer hover:bg-primary-300"
                    >
                      {this.props.sideNavbarStatus === false ? (
                        <TbArrowsDiagonalMinimize2 className="text-2xl text-primary-800 animate__animated animate__zoomIn" />
                      ) : (
                        <AiOutlineMenu className="text-2xl text-primary-800 animate__animated animate__fadeIn" />
                      )}
                    </div>
                    <div className="">
                      <div className="flex flex-row items-center gap-2 text-lg rounded-full w-max pr-3 cursor-pointer group">
                        <div>
                          <RiComputerLine className="text-3xl text-primary-700" />
                        </div>
                        <span className="text-gray-700 font-bold">
                          ASSET MANAGEMENT SYSTEM
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {this.props.auth.isAuthenticated === true ? (
                <div className="flex flex-row items-center gap-2 justify-end mr-2">
                  {/* User icon */}
                  <div className="relative">
                    <div
                      className="flex flex-row items-center cursor-pointer group bg-gray-100 hover:bg-primary-100 py-2 pl-4 pr-1 rounded-md"
                      onClick={() =>
                        this.setState({ view_user: !this.state.view_user })
                      }
                    >
                      <div className="text-sm pr-3 group-hover:text-primary-800">
                        {this.props.auth.user?.user_info.full_name}
                      </div>
                      <div
                        className={`rounded-full flex items-center justify-center bg-gray-400 group-hover:bg-primary-800 text-white h-8 w-8  cursor-pointer`}
                      >
                        <FaUserCircle className="text-3xl animate__animated animate__fadeIn" />
                      </div>
                      <div className="ml-1">
                        <IoIosArrowDown className="text-xl text-gray-500 group-hover:text-primary-800" />
                      </div>
                    </div>
                    {this.state.view_user === true && (
                      <div className="h-full overflow-y-auto">
                        <div
                          onClick={() => this.setState({ view_user: false })}
                          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60"
                          title="Click here to close"
                        ></div>
                        <div className="absolute right-0 pt-0 top-1">
                          <div className="border border-gray-300 bg-white p-3 rounded-md w-64 shadow-xl animate__animated animate__fadeInRight animate__faster">
                            <div className="flex flex-col items-center justify-center w-full gap-0">
                              <div className="mt-3">
                                <div className="rounded-full text-gray-400 flex items-center justify-center h-24 w-24 overflow-hidden">
                                  <FaUserCircle className="text-8xl" />
                                </div>
                              </div>
                              <div className="font-bold text-center text-gray-500 mt-2">
                                <span>
                                  {this.props.auth.user?.user_info.full_name}
                                </span>
                              </div>
                              <div className="font-bold text-left text-sm flex flex-row items-center gap-2">
                                <div>
                                  <IoMdLogIn className="text-xl text-primary-800" />
                                </div>
                                <span>
                                  {
                                    this.props.auth.user?.user_info
                                      .phone_numbers
                                  }
                                </span>
                              </div>
                              {this.props.auth.user !== null &&
                                this.props.auth.user.district !== null && (
                                  <div className="text-center text-accent-900 mb-1 text-sm">
                                    {
                                      this.props.auth.user.district
                                        .district_name
                                    }
                                  </div>
                                )}
                              {this.props.auth.user !== null &&
                                this.props.auth.user.school !== null && (
                                  <div className="text-center text-accent-900 mb-1 text-sm">
                                    {this.props.auth.user.school?.school_name}
                                  </div>
                                )}
                              <div className="font-bold text-center mb-4 text-white bg-primary-700 rounded-md px-2 text-xs">
                                <span className="font-normal">
                                  {this.props.auth.user?.role?.role}
                                </span>
                              </div>
                            </div>

                            <div className="mt-5 text-black">
                              <div className="text-sm text-gray-600 mt-5 mb-2">
                                ACTION MENU
                              </div>
                              <Link
                                onClick={() =>
                                  this.setState({ view_user: false })
                                }
                                to={"/profile"}
                                className="flex flex-row items-center gap-2 bg-gray-50 rounded-md px-2 py-1 cursor-pointer hover:bg-primary-700 hover:text-white group"
                              >
                                <div>
                                  <FaUserCircle className="text-xl text-primary-700 group-hover:text-white" />
                                </div>
                                <div>User Profile</div>
                              </Link>

                              <Link
                                onClick={() =>
                                  this.setState({ view_user: false })
                                }
                                to={"/change-password"}
                                className="flex flex-row items-center gap-2 bg-gray-50 rounded-md px-2 py-1 cursor-pointer hover:bg-primary-700 hover:text-white group"
                              >
                                <div>
                                  <RiLockPasswordLine className="text-xl text-red-700 group-hover:text-white" />
                                </div>
                                <div>Change password</div>
                              </Link>

                              <div
                                onClick={() => {
                                  this.setState({ view_user: false });
                                  this.props.FC_Logout();
                                }}
                                className="flex flex-row items-center gap-2 border border-yellow-700 rounded-md px-2 py-1 cursor-pointer hover:bg-yellow-700 hover:text-white group mt-2"
                              >
                                <div>
                                  <AiOutlineLogout className="text-xl text-gray-500 group-hover:text-white" />
                                </div>
                                <div>Sign out</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <a
                    href="https://www.ur.ac.rw"
                    title="University of Rwanda Website"
                    className="px-6 py-2 rounded-md border border-primary-800 hover:bg-primary-800 text-primary-800 font-bold hover:text-white w-max text-sm"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Back to home
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
