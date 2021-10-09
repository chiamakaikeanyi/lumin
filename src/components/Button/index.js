import React from 'react';

const Button = ({ label, handleClick, className }) => {
  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
};

export default Button;
