import Form from "@components/forms/form";
import TextInput from "@components/textinputs/textinput";
import React from "react";
import { FiLock, FiUser } from "react-icons/fi";
import RCBCLogo from "@assets/logos/rcbc.svg";
import Button from "@components/buttons/button";
import ThemeSwitch from "@components/switches/theme-switch";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/dashboard/admin");
  };
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      <div className="top-0 right-0 absolute p-2">
        <ThemeSwitch />
      </div>
      <div className="max-w-xl w-full">
        <Form
          className="grid gap-2"
          onSubmit={handleSubmit}
          showControls={false}
        >
          <div className="flex items-center justify-center gap-4 mb-4 p-4">
            {/* <img
              src={RCBCLogo}
              className="h-16 drop-shadow-md"
              alt="RCBC Logo"
            /> */}
            {/* <div className="border-l border-[#4892cf]/50 h-18 shadow-md"></div> */}
            <div className="text-center h-full border-slate-300 flex-1">
              <h1 className="text-3xl font-bold text-[#4892cf] drop-shadow-md">
                System Name
              </h1>
              <h1 className="text-sm font-medium text-slate-400">
                Signin to continue
              </h1>
            </div>
          </div>

          <TextInput
            name={"Username"}
            type="username"
            id={"signin-username"}
            placeholder={"Username"}
            icon={FiUser}
            required
          />
          <TextInput
            name={"Password"}
            type="password"
            id={"signin-password"}
            placeholder={"Password"}
            icon={FiLock}
            required
          />
          <p className="text-xs text-right font-semibold text-blue-500 mb-4">
            <span className="cursor-pointer">Forgot Password?</span>
          </p>
          <Button
            id={`signin-submit`}
            name={`signin-submit`}
            type="submit"
            color="blue"
            fullWidth
          >
            Signin
          </Button>
          <div className="p-4 flex items-center gap-2 border-t border-slate-300 mt-4">
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">
                Copyright 2025 RCBC. All Rights Reserved.
              </p>
              <p className="text-xs text-slate-400">
                Developed by
                <span className="font-semibold text-blue-500 cursor-pointer ml-1">
                  Nutech Hardware & Software Solutions
                </span>
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
