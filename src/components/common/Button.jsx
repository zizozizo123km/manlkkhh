import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Common Button component, supporting various styles and behaviors.
 * Used across the application for actions and navigation.
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'link', 'danger', 'cta'
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false,
  fullWidth = false,
  isLoading = false,
  className,
  ...rest
}) => {
  const baseClasses = 'font-semibold rounded-lg transition duration-200 ease-in-out flex items-center justify-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    // Primary Blue (Facebook standard blue)
    primary: 'bg-fb-blue text-white hover:bg-fb-blue-dark active:bg-fb-blue-active focus:ring-fb-blue-light',
    
    // Secondary Gray (For general actions like Cancel, Share)
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400',
    
    // Ghost (Transparent/Outline for header actions, etc.)
    ghost: 'bg-transparent text-fb-blue hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-200',
    
    // Link (Text-only button, often used within paragraphs or forms)
    link: 'bg-transparent text-fb-blue hover:underline p-0 m-0 focus:ring-transparent',
    
    // Danger Red (For Delete, Remove actions)
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-300',

    // CTA (Call to Action - often Green/special)
    cta: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus:ring-green-300',
  };

  const disabledClasses = 'opacity-60 cursor-not-allowed';

  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const buttonClasses = classNames(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
    {
      [disabledClasses]: disabled || isLoading,
      'w-full': fullWidth,
      // Apply different styles for link variant to ensure it doesn't look like a standard button block
      'py-0': variant === 'link',
      'cursor-default': isLoading,
    }
  );

  const handleClickInternal = (e) => {
    if (disabled || isLoading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClickInternal}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && variant !== 'link' && loadingSpinner}
      {isLoading && variant === 'link' ? 'Loading...' : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'link', 'danger', 'cta']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;