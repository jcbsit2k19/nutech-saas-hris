import Button from "@components/buttons/button";
import Typography from "@components/typography/typography";
import React from "react";
import { TbCancel, TbSend } from "react-icons/tb";

export default function Form({
  title,
  description,
  showControls = true,
  borderLess = false,
  ...rest
}) {
  const { id, name, className, children, onSubmit, onCancel } = rest;
  return (
    <form
      {...rest}
      className={`rounded-md p-4 ${
        borderLess
          ? ""
          : "border border-slate-300 dark:border-slate-500 shadow-md "
      }w-full`}
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
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
      {showControls && (
        <div className="flex justify-end items-center gap-2 mt-4">
          {onSubmit && (
            <Button
              id={`${id}-submit`}
              name={`${name}-submit`}
              type="submit"
              icon={TbSend}
              color="green"
            >
              Submit
            </Button>
          )}

          {onCancel && (
            <Button
              id={`${id}-cancel`}
              name={`${name}-cancel`}
              type="button"
              icon={TbCancel}
              color="red"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
