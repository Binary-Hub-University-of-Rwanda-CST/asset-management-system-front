// Button.jsx

import React from 'react';
import styled from 'styled-components';

const ButtonComponent = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border-radius: 9px;
  padding: 0.3rem; /* Add the missing semicolon and adjust the value */
  height: ${props =>
    props.size === 'sm'
      ? '30px'
      : props.size === 'md'
      ? '37px'
      : props.size === 'lg'
      ? '40px'
      : '34px'};
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: 1px solid transparent;
  background-color: ${props =>
    props.variant === 'light'
      ? '#FFF;'
      : props.variant === 'dark'
      ? '#212529'
      : props.variant === 'primary'
      ? '#2D90D2'
      : props.variant === 'secondary'
      ? '#E8F1F8;'
      : props.variant === 'success'
      ? '#00A524;'
      : props.variant === 'info'
      ? '#0dcaf0'
      : props.variant === 'warning'
      ? 'rgba(252, 191, 34, 1)'
      : props.variant === 'danger'
      ? '#FFF'
      : '#f8f9fa'}; /* Add # before f8f9fa */
  color: ${props =>
    props.variant === 'light'
      ? '#212529'
      : props.variant === 'dark'
      ? '#ffffff'
      : props.variant === 'primary'
      ? '#ffffff'
      : props.variant === 'secondary'
      ? '#ffffff'
      : props.variant === 'success'
      ? '#ffffff'
      : props.variant === 'info'
      ? '#ffffff'
      : props.variant === 'warning'
      ? '#ffffff'
      : props.variant === 'danger'
      ? 'rgba(237, 0, 0, 1);'
      : '#212529'};
`;

const Button = ({ type, variant, className, size, id, onClick, children }) => {
  return (
    <ButtonComponent
      type={type ? type : 'button'}
      className={className ? `btn-component ${className}` : 'btn-component'}
      id={id}
      onClick={onClick}
      size={size}
      variant={variant}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
