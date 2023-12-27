import React, { Component } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth, FC_SetError, FC_SetSuccess } from "../../actions";
import Alert, { AlertType } from "../../components/Alert/Alert";
import { MdOutlineDashboard } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

interface AppState {
  loading: boolean;
  success: string;
  error: string;
}
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
      success: "",
      error: "",
    };
  }

  componentDidMount = () => {};

  render() {


    return (
      <div className="mr-4 mt-20 ml-72 ">
        <div className="flex flex-row items-center gap-5 mb-2 bg-white rounded-lg p-3 animate__animated animate__fadeInRight animate__faster">
          <div className="pl-1">
            <MdOutlineDashboard className="text-4xl text-my-blue" />
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="px-2 rounded-md bg-primary-700 text-black w-max font-bold">
               Dashboard
            </div>
          </div>
        </div>
        {this.state.error !== null && (
          <div className="w-full my-3">
            {this.state.error !== "" && (
              <Alert
                alertType={AlertType.WARNING}
                title={"Not found!"}
                description={this.state.error}
                close={() => {
                  this.setState({
                    error: "",
                  });
                }}
                className={"border-2 border-white"}
              />
            )}
          </div>
        )}
        <div className="p-4 rounded-lg bg-white py-10 pb-16 animate__animated animate__fadeInRight animate__fast">
          <div className="flex items-center justify-center w-full">
            <FaComputer className="text-9xl text-gray-300" />
          </div>
          <div className="text-center text-3xl font-bold text-gray-400 uppercase">
            Asset Management System
          </div>
          <div className="text-center text-2xl font-light text-black">
            University of Rwanda
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  auth,
}: StoreState): {
  auth: Auth;
} => {
  return {
    auth,
  };
};

export const Dashboard = connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
})(App);
