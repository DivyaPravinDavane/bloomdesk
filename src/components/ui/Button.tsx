"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  href,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#008fb4]/40 disabled:opacity-50 disabled:pointer-events-none select-none";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#008fb4] text-white hover:bg-[#007797] shadow-sm hover:shadow-md active:bg-[#075f7a]",
    secondary:
      "bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm hover:shadow-md active:bg-[#020617]",
    outline:
      "border border-[#0F172A]/20 text-[#0F172A] hover:bg-[#0F172A]/5 hover:border-[#0F172A]/40 active:bg-[#0F172A]/10",
    white:
      "bg-white text-[#0F172A] hover:bg-slate-50 shadow-sm hover:shadow-md border border-slate-200/60",
    ghost:
      "text-[#008fb4] hover:bg-[#008fb4]/10 active:bg-[#008fb4]/20",
  }[variant];

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} group ${className}`}
        onClick={onClick as any}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} group ${className}`}
      onClick={onClick}
      {...props}
    >
      {content}
    </motion.button>
  );
};
