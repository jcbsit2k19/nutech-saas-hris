import React, { Component } from "react";
import HeightAnimation from "@components/animations/height-animation";
import Button from "@components/buttons/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsBug } from "react-icons/bs";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo: errorInfo });
  }

  toggleDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, showDetails } = this.state;
      const errorMessage =
        error && error.message
          ? error.message
          : "An unexpected error occurred.";
      const stackTrace =
        errorInfo && errorInfo.componentStack ? errorInfo.componentStack : "";

      return (
        <div className="flex items-center justify-center w-full h-screen p-4">
          <div className="text-center space-y-2 items-center flex flex-col">
            <div className="animate-bounce">
              <BsBug className="text-8xl rotate-45 drop-shadow-md text-red-800" />
            </div>

            <i className="fi fi-rr-error-bug"></i>
            <h1 className="text-xl text-slate-800 font-medium">
              Something Went Wrong
            </h1>
            <p className="text-sm text-slate-600">
              Please contact our support team
            </p>
            {errorInfo && (
              <div className="space-y-4 transition-all ease-in-out duration-300 overflow-hidden">
                <div className="flex justify-center mt-4">
                  <Button
                    id={"error-view-button"}
                    name={"errorViewButton"}
                    icon={showDetails ? FaEye : FaEyeSlash}
                    color={"red"}
                    onClick={this.toggleDetails}
                  >
                    {showDetails ? "Hide Details" : "Show Details"}
                  </Button>
                </div>

                <div
                  className={`text-sm whitespace-pre-wrap bg-slate-800 text-red-500 rounded-md text-left ${
                    showDetails ? "max-h-[500px] p-4" : "max-h-0"
                  } transition-max-h duration-300 overflow-hidden`}
                >
                  <HeightAnimation isVisible={showDetails}>
                    <div>
                      <p className="text-slate-400">Error Message</p>
                      <p className="mb-2">{errorMessage}</p>
                      <p className="text-slate-400">Component Stack Trace:</p>
                      <pre className="text-sm text-red-500 whitespace-pre-wrap">
                        {stackTrace}
                      </pre>
                    </div>
                  </HeightAnimation>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
