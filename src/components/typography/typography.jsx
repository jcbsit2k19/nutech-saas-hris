import React from "react";

const variants = {
  header: "text-lg font-semibold text-slate-800 dark:text-white tracking-tight",
  subheader: "text-sm font-medium text-slate-400 dark:text-slate-300",
  content: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed",
};

export default function Typography({ variant = "header", children }) {
  return <p className={variants[variant]}>{children}</p>;
}
