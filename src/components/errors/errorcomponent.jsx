import React from "react";
import {
  GoDependabot,
  GoAlert,
  GoLock,
  GoShieldLock,
  GoBug,
  GoChevronLeft,
  GoReply,
} from "react-icons/go";
import { AiOutlineRollback } from "react-icons/ai";
import { TbMoodSadSquint, TbPlugConnectedX, TbRouteOff } from "react-icons/tb";
import { MdOutlineTimerOff } from "react-icons/md";
import Button from "@components/buttons/button";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function ErrorComponent({ code }) {
  const navigate = useNavigate();
  const errorDetails = getErrorDetails(code);

  return (
    <div className="flex h-full items-center justify-center rounded-md shadow-md bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="animate-bounce">{errorDetails.icon}</div>
        <h1 className="text-2xl font-semibold drop-shadow-md">
          {errorDetails.title}
        </h1>
        <p className="">{errorDetails.message}</p>
        <div className="mt-4">
          <Button
            icon={RiArrowGoBackFill}
            color="red"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

function getErrorDetails(code) {
  const commonStyle = "text-8xl drop-shadow-md text-red-700";

  switch (code) {
    case 400:
      return {
        icon: <GoAlert className={`${commonStyle}`} />,
        title: "Bad Request",
        message:
          "The server could not understand the request due to invalid syntax. Please check your input and try again.",
      };
    case 401:
      return {
        icon: <GoLock className={`${commonStyle} rotate-45`} />,
        title: "Unauthorized",
        message:
          "You need to be logged in to access this page. Please authenticate and try again.",
      };
    case 403:
      return {
        icon: <GoShieldLock className={`${commonStyle}`} />,
        title: "Forbidden",
        message: "You do not have permission to access this resource.",
      };
    case 404:
      return {
        icon: <TbRouteOff className={`${commonStyle}`} />,
        title: "Page Not Found",
        message:
          "The page you are looking for does not exist or has been moved.",
      };
    case 500:
      return {
        icon: <GoBug className={`${commonStyle} rotate-45`} />,
        title: "Internal Server Error",
        message:
          "We're experiencing some technical difficulties. Please try again later.",
      };
    case 502:
      return {
        icon: <TbPlugConnectedX className={`${commonStyle}`} />,
        title: "Bad Gateway",
        message:
          "We're having trouble connecting to our services. Please try again in a few moments.",
      };
    case 503:
      return {
        icon: <GoDependabot className={`${commonStyle}`} />,
        title: "Service Unavailable",
        message:
          "The service is temporarily unavailable, likely for maintenance. Please check back soon.",
      };
    case 504:
      return {
        icon: <MdOutlineTimerOff className={`${commonStyle} rotate-15`} />,
        title: "Gateway Timeout",
        message:
          "We're not getting a response from our servers. Please try refreshing the page.",
      };
    default:
      return {
        icon: <TbMoodSadSquint className={`${commonStyle} rotate-45`} />,
        title: "Something Went Wrong",
        message: "An unexpected error occurred. We're working on fixing it.",
      };
  }
}
