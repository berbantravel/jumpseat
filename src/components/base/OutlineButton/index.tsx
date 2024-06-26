import React from 'react';
import { ButtonProps } from '@/types/models';

const OutlineButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const buttonClasses = [
    "px-5 py-1 mr-2 w-44 rounded-full shadow-lg body2Medium outline outline-2 outline-primary-base text-primary-base text-center text-sm sm:text-base leading-tight hover:bg-primary active:bg-primary focus:outline-none focus:ring-4 focus:ring-primary-base transition duration-150 ease-in-out",
    className 
  ].join(' ')

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
