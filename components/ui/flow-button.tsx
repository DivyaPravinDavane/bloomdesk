'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: 'dark' | 'light' | 'primary';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function FlowButton({
  text = "Modern Button",
  variant = "dark",
  className = "",
  onClick,
  icon,
  ...props
}: FlowButtonProps) {
  const isLight = variant === 'light';
  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        "group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] px-8 py-3.5 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]",
        isLight
          ? "border-white/40 bg-white/10 backdrop-blur-md text-white hover:border-transparent hover:text-white hover:rounded-[14px]"
          : isPrimary
          ? "border-[#008fb4]/50 bg-[#008fb4]/10 text-[#008fb4] hover:border-transparent hover:text-white hover:rounded-[14px]"
          : "border-[#333333]/40 bg-transparent text-[#111111] hover:border-transparent hover:text-white hover:rounded-[12px]",
        className
      )}
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className={cn(
          "absolute w-4 h-4 left-[-25%] fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isLight ? "stroke-white" : isPrimary ? "stroke-white" : "stroke-[#111111] group-hover:stroke-white"
        )} 
      />

      {/* Text with optional icon */}
      <span className="relative z-[1] flex items-center gap-2 -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
        {icon && <span className="opacity-80 group-hover:opacity-100">{icon}</span>}
      </span>

      {/* Expanding Circular Fill */}
      <span
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[320px] group-hover:h-[320px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          isLight ? "bg-[#008fb4]" : isPrimary ? "bg-[#008fb4]" : "bg-[#111111]"
        )}
      />

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className={cn(
          "absolute w-4 h-4 right-4 fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isLight ? "stroke-white" : isPrimary ? "stroke-[#008fb4] group-hover:stroke-white" : "stroke-[#111111] group-hover:stroke-white"
        )} 
      />
    </button>
  );
}

export default FlowButton;
