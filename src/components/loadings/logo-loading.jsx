import React from "react";

export default function LogoLoading() {
  return (
    <div className="flex items-center justify-center relative">
      <svg className="w-32 h-32 absolute" viewBox="0 0 16 18">
        <path
          className="stroke-[#4892cf] stroke-1 animate-dash-hexagon"
          fill="none"
          d="M7.21487 1.2868C7.88431 0.9044 8.73031 0.9044 9.39974 1.2868L9.40283 1.28856L14.4613 4.20761C15.1684 4.598 15.5746 5.33558 15.5746 6.11465V8.99996V11.8853C15.5746 12.6507 15.1632 13.3848 14.4617 13.7721L9.37973 16.7132C8.71029 17.0956 7.86428 17.0956 7.19485 16.7132L7.19088 16.7109L2.11279 13.772C1.40602 13.3816 1 12.6441 1 11.8653V8.98995V6.11465C1 5.31458 1.44381 4.59039 2.10827 4.21051L7.21487 1.2868Z"
        />
      </svg>
      <svg className="w-44 h-44 absolute" viewBox="0 0 16 18">
        <path
          className="stroke-[#4892cf] stroke-1 animate-dash-hexagon2"
          fill="none"
          d="M7.21487 1.2868C7.88431 0.9044 8.73031 0.9044 9.39974 1.2868L9.40283 1.28856L14.4613 4.20761C15.1684 4.598 15.5746 5.33558 15.5746 6.11465V8.99996V11.8853C15.5746 12.6507 15.1632 13.3848 14.4617 13.7721L9.37973 16.7132C8.71029 17.0956 7.86428 17.0956 7.19485 16.7132L7.19088 16.7109L2.11279 13.772C1.40602 13.3816 1 12.6441 1 11.8653V8.98995V6.11465C1 5.31458 1.44381 4.59039 2.10827 4.21051L7.21487 1.2868Z"
        />
      </svg>
      <style jsx="true">{`
        @keyframes dash-hexagon {
          0% {
            stroke-dasharray: 1, 160;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 80, 160;
            stroke-dashoffset: -32;
          }
          100% {
            stroke-dasharray: 80, 160;
            stroke-dashoffset: -124;
          }
        }
        .animate-dash-hexagon {
          animation: dash-hexagon 2.1s ease-in-out infinite;
        }
        .animate-dash-hexagon2 {
          animation: dash-hexagon 2.1s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
}
