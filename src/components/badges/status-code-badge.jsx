import React from "react";

export default function StatusCodeBadge({ code, noText = false }) {
  const commonStyle = noText
    ? "rounded-full text-xs text-white text-center font-medium w-2 h-2 shadow-md"
    : "rounded-full text-xs text-white font-medium w-16 h-6 shadow-md flex items-center justify-center";

  let statusText = "";
  let bgColor = "";

  if (code >= 200 && code < 300) {
    // 2xx Success
    bgColor = "bg-green-300";
    if (noText === false) {
      if (code === 200) statusText = "OK";
      else if (code === 201) statusText = "Created";
      else if (code === 204) statusText = "No Content";
      else statusText = "Success"; // General success
    }
  } else if (code >= 300 && code < 400) {
    // 3xx Redirection
    bgColor = "bg-blue-300";
    if (noText === false) {
      if (code === 301) statusText = "Moved";
      else if (code === 302) statusText = "Found";
      else if (code === 304) statusText = "Not Modified";
      else statusText = "Redirect"; // General redirect
    }
  } else if (code >= 400 && code < 500) {
    // 4xx Client Error
    bgColor = "bg-yellow-300";
    if (noText === false) {
      if (code === 400) statusText = "Bad Req";
      else if (code === 401) statusText = "Unauth";
      else if (code === 403) statusText = "Forbid";
      else if (code === 404) statusText = "Not Found";
      else if (code === 409) statusText = "Conflict";
      else statusText = "Client Err"; // General client error
    }
  } else if (code >= 500 && code < 600) {
    // 5xx Server Error
    bgColor = "bg-red-300";
    if (noText === false) {
      if (code === 500) statusText = "Int. Err";
      else if (code === 501) statusText = "Not Impl";
      else if (code === 503) statusText = "Service Unav";
      else statusText = "Server Err"; // General server error
    }
  } else {
    //Unknown or outside standard range
    bgColor = "bg-gray-300";
    if (noText === false) {
      statusText = "Unknown";
    }
  }

  return (
    <div className={`${commonStyle} ${bgColor}`}>
      {noText === false ? statusText : ""}
    </div>
  );
}
