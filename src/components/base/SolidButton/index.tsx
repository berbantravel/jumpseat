import React from 'react';

import { ButtonProps } from '@/types/models';

const SolidButton: React.FC<ButtonProps> = ({ children, className, type = 'button', ...props }) => {
  const buttonClasses = [
    "mr-2 py-1 w-44 rounded-[30px] ring-2 ring-primary-base bg-primary-base text-text-white-primary leading-tight body2Medium sm:text-base hover:bg-primary-hover active:bg-primary-pressed focus:outline-none focus:ring-4 focus:ring-primary-50 transition duration-150 ease-in-out",
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default SolidButton;
