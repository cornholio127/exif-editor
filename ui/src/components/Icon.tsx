import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Image } from './icons/image.svg';
import { ReactComponent as Folder } from './icons/folder.svg';
import { ReactComponent as ArrowUp } from './icons/arrow_up.svg';

export type IconType = 'image' | 'folder' | 'arrow-up';
type SizeType = 'small' | 'medium' | 'large';

const icons: Record<IconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  image: Image,
  folder: Folder,
  'arrow-up': ArrowUp,
};

const sizes: Record<SizeType, string> = {
  small: '16px',
  medium: '24px',
  large: '32px',
};

interface Props {
  className?: string;
  type: IconType;
  size?: SizeType;
  color?: string;
}

const IconWrapper = styled.span<{ size: string; fillColor: string }>`
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  svg {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    fill: ${({ fillColor }) => fillColor};
  }
`;

const Icon: React.FC<Props> = ({ className, type, size = 'small', color = 'black' }) => {
  const SvgIcon = icons[type];
  return (
    <IconWrapper className={className} size={sizes[size]} fillColor={color}>
      <SvgIcon />
    </IconWrapper>
  );
};

Icon.displayName = 'Icon';

export default Icon;
