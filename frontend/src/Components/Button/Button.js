import React from 'react';
import styled from 'styled-components';

function Button({
  name = 'Click Me',
  icon = null,
  onClick = () => {},
  bg = 'var(--color-primary)',
  bPad = '.6rem 1.2rem',
  color = '#696969',
  bRad = '8px',
  type = 'button',
}) {
  return (
    <ButtonStyled
      type={type}
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
      }}
      onClick={onClick}
      aria-label={name}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(1.05);
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default Button;
