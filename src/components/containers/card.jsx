import Typography from "@components/typography/typography";
import React from "react";

export default function Card({ title, description, ...rest }) {
  const { children, className } = rest;
  return (
    <div
      className={`rounded-md p-4 border border-slate-300 dark:bg-slate-900 dark:border-slate-500 shadow-md`}
    >
      {(title || description) && (
        <div className="mb-2">
          {title && <Typography variant="header">{title}</Typography>}
          {description && (
            <Typography variant="subheader">{description}</Typography>
          )}
        </div>
      )}

      <div className={className}>{children}</div>
    </div>
  );
}
