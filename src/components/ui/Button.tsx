import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-white text-black hover:bg-white/90',
    secondary: 'bg-brand-blue text-white hover:bg-brand-blue/90 blue-glow border border-brand-blue/50',
    outline: 'border border-white/[0.08] hover:bg-white/[0.03] text-white/80 hover:text-white',
    ghost: 'hover:bg-white/[0.03] text-white/60 hover:text-white',
  };

  const sizes = {
    sm: 'px-5 py-2 text-[12px]',
    md: 'px-7 py-3 text-[14px]',
    lg: 'px-9 py-4 text-[16px]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
