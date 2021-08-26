import React from 'react';
import styled from 'styled-components';
import Icon, { IconType } from './Icon';

interface Props {
  className?: string;
  icon: IconType;
  onClick?: () => void;
}

const Button = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 0;
  padding: 6px;
  background: rgba(0, 0, 0, 0);
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  &:active {
    background: rgba(0, 0, 0, 0.06);
  }
`;

const IconButton: React.FC<Props> = ({ className, icon, onClick }) => {
  return (
    <Button className={className} onClick={onClick}>
      <Icon type={icon} color="#b8b8b8" />
    </Button>
  );
};

IconButton.displayName = 'IconButton';

export default IconButton;
