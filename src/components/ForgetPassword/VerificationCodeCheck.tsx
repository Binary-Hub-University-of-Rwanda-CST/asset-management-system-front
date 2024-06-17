import React, { Component } from "react";
import Alert, { AlertType } from "../Alert/Alert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiEditCircleLine } from "react-icons/ri";

interface VerificationCodeCheckProps {
  phone_number: string;
  goBack: () => void;
  onSuccess: () => void;
}
interface VerificationCodeCheckState {
  phone_number: string;
  verification_code: string;
  new_password: string;
  confirm_password: string;
  error: {
    target:
      | "main"
      | "phone_number"
      | "verification_code"
      | "new_password"
      | "confirm_password";
    msg: string;
  } | null;
  loading: boolean;
  success: string;
}

export class VerificationCodeCheck extends Component<
  VerificationCodeCheckProps,
  VerificationCodeCheckState
> {
  constructor(props: VerificationCodeCheckProps) {
    super(props);
    this.state = {
      phone_number: this.props.phone_number,
      error: null,
      loading: false,
      success: "",
      confirm_password: "",
      new_password: "",
      verification_code: "",
    };
  }
  verifySubmittedCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.phone_number === "") {
      return this.setState({
        error: { target: "phone_number", msg: "Please type phone number" },
      });
    }
    if (this.state.verification_code === "") {
      return this.setState({
        error: {
          target: "verification_code",
          msg: "Please type verification code",
        },
      });
    }
    if (this.state.new_password === "") {
      return this.setState({
        error: { target: "new_password", msg: "Please type new password" },
      });
    }
    if (this.state.confirm_password === "") {
      return this.setState({
        error: {
          target: "confirm_password",
          msg: "Please verify new password",
        },
      });
    }
    if (this.state.new_password !== this.state.confirm_password) {
      return this.setState({
        error: {
          target: "confirm_password",
          msg: "Password does not match",
        },
      });
    }
    this.setState({ loading: true });
    // API Codes here
  };
  render() {
    return (
      <div className="rounded-lg bg-white shadow-md p-3 md:p-5 animate__animated animate__backInUp animate__faster">
        <div className="font-extrabold text-2xl">Reset New Password</div>
        <div className="text-sm text-gray-500">
          Fill the form to set new password
        </div>
        <div className="mt-6">
          <form
            onSubmit={this.verifySubmittedCode}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col w-full">
              <span>Verification Code</span>
              <input
                type="text"
                value={this.state.verification_code}
                onChange={(e) => {
                  this.setState({ verification_code: e.target.value });
                  this.state.error !== null &&
                    this.setState({
                      error: null,
                    });
                }}
                disabled={this.state.loading}
                autoFocus={true}
                className={`border ${
                  this.state.error?.target === "verification_code"
                    ? "border-red-300"
                    : "border-gray-400"
                } ${
                  this.state.loading === true ? "cursor-not-allowed" : ""
                }  bg-white text-black rounded-md px-3 py-2 focus:outline-none`}
              />
              <div>
                {this.state.error?.target === "verification_code" && (
                  <Alert
                    alertType={AlertType.DANGER}
                    title={"Error"}
                    description={this.state.error.msg}
                    close={() => {
                      this.setState({
                        error: null,
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span>New password</span>
              <input
                type="password"
                value={this.state.new_password}
                onChange={(e) => {
                  this.setState({ new_password: e.target.value });
                  this.state.error !== null &&
                    this.setState({
                      error: null,
                    });
                }}
                disabled={this.state.loading}
                autoFocus={true}
                className={`border ${
                  this.state.error?.target === "new_password"
                    ? "border-red-300"
                    : "border-gray-400"
                } ${
                  this.state.loading === true ? "cursor-not-allowed" : ""
                }  bg-white text-black rounded-md px-3 py-2 focus:outline-none`}
              />
              <div>
                {this.state.error?.target === "new_password" && (
                  <Alert
                    alertType={AlertType.DANGER}
                    title={"Error"}
                    description={this.state.error.msg}
                    close={() => {
                      this.setState({
                        error: null,
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span>Confirm New password</span>
              <input
                type="password"
                value={this.state.confirm_password}
                onChange={(e) => {
                  this.setState({ confirm_password: e.target.value });
                  this.state.error !== null &&
                    this.setState({
                      error: null,
                    });
                }}
                disabled={this.state.loading}
                autoFocus={true}
                className={`border ${
                  this.state.error?.target === "confirm_password"
                    ? "border-red-300"
                    : "border-gray-400"
                } ${
                  this.state.loading === true ? "cursor-not-allowed" : ""
                }  bg-white text-black rounded-md px-3 py-2 focus:outline-none`}
              />
              <div>
                {this.state.error?.target === "confirm_password" && (
                  <Alert
                    alertType={AlertType.DANGER}
                    title={"Error"}
                    description={this.state.error.msg}
                    close={() => {
                      this.setState({
                        error: null,
                      });
                    }}
                  />
                )}
              </div>
            </div>

            <div className="-mb-4">
              {this.state.error?.target === "main" && (
                <div className="pb-2">
                  <Alert
                    alertType={AlertType.DANGER}
                    title={"Failed to login!"}
                    description={this.state.error.msg}
                    close={() => {
                      this.setState({
                        error: null,
                      });
                    }}
                  />
                </div>
              )}
              {this.state.success !== "" && (
                <div className="pb-2">
                  <Alert
                    alertType={AlertType.SUCCESS}
                    title={"Action Succeeded!"}
                    description={this.state.success}
                    close={() => {
                      this.setState({
                        error: null,
                        success: "",
                      });
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col w-full">
              <button
                type="submit"
                disabled={this.state.loading}
                className={`${
                  this.state.loading === true
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-primary-700 hover:bg-primary-800"
                }  text-white font-bold px-6 pl-2 py-2 w-max rounded-md flex flex-row justify-center items-center gap-2`}
              >
                <div>
                  {this.state.loading === true ? (
                    <AiOutlineLoading3Quarters className="text-xl animate-spin" />
                  ) : (
                    <RiEditCircleLine className="text-xl" />
                  )}
                </div>
                <span className="truncate">
                  {this.state.loading === true
                    ? "Loading..."
                    : "Rest New Password"}
                </span>
              </button>
              <div className="mt-3">
                <div
                  className="font-light hover:text-primary-800 hover:underline cursor-pointer"
                  onClick={this.props.goBack}
                >
                  Back to Login?
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
