import React, { Component } from "react";
import Alert, { AlertType } from "../Alert/Alert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsEnvelope } from "react-icons/bs";
import { VerificationCodeCheck } from "./VerificationCodeCheck";

interface ForgetPasswordProps {
  goBack: () => void;
}
interface ForgetPasswordState {
  phone_number: string;
  error: {
    target: "main" | "phone_number";
    msg: string;
  } | null;
  loading: boolean;
  success: string;
  redirect: boolean;
}

export class ForgetPassword extends Component<
  ForgetPasswordProps,
  ForgetPasswordState
> {
  constructor(props: ForgetPasswordProps) {
    super(props);
    this.state = {
      phone_number: "",
      error: null,
      loading: false,
      success: "",
      redirect: false,
    };
  }
  requestForVerificationCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.phone_number === "") {
      return this.setState({
        error: { target: "phone_number", msg: "Please type phone number" },
      });
    }
    this.setState({ loading: true });
    // Codes here
  };
  render() {
    if (this.state.redirect === true && this.state.phone_number !== "") {
      return (
        <VerificationCodeCheck
          phone_number={this.state.phone_number}
          goBack={() => {
            this.setState({ redirect: false });
          }}
          onSuccess={this.props.goBack}
        />
      );
    }
    return (
      <div className="rounded-lg bg-white shadow-md p-3 md:p-5 animate__animated animate__backInUp animate__faster">
        <div className="font-extrabold text-2xl">Password Recovery</div>
        <div className="text-sm text-gray-500">
          Type your phone number to receive new password
        </div>
        <div className="mt-6">
          <form
            onSubmit={this.requestForVerificationCode}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col w-full">
              <span>Phone Number</span>
              <input
                type="text"
                value={this.state.phone_number}
                onChange={(e) => {
                  this.setState({ phone_number: e.target.value });
                  this.state.error !== null &&
                    this.setState({
                      error: null,
                    });
                }}
                disabled={this.state.loading}
                autoFocus={true}
                className={`border ${
                  this.state.error?.target === "phone_number"
                    ? "border-red-300"
                    : "border-gray-400"
                } ${
                  this.state.loading === true ? "cursor-not-allowed" : ""
                }  bg-white text-black rounded-md px-3 py-2 focus:outline-none`}
              />
              <div>
                {this.state.error?.target === "phone_number" && (
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
                <div className="pt-2">
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
                    <BsEnvelope className="text-xl" />
                  )}
                </div>
                <span className="truncate">
                  {this.state.loading === true
                    ? "Loading..."
                    : "Receive verification code"}
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
