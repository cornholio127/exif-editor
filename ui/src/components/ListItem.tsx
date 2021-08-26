import React from 'react';
import styled from 'styled-components';
import Icon, { IconType } from './Icon';

export interface ItemData {
  id: string;
  label: string;
  icon?: IconType;
}

interface Props {
  className?: string;
  data: ItemData;
  selected: boolean;
  onClick: () => void;
}

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  background: ${({ selected }) => (selected ? '#404040' : '#202020')};
  padding: 4px 8px;
  user-select: none;
  &:hover {
    background: ${({ selected }) => (selected ? '#404040' : '#282828')};
  }
`;

const Label = styled.span`
  font-size: 12px;
  color: #808080;
`;

const Gap = styled.div`
  width: 8px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const ListItem: React.FC<Props> = ({ className, data, selected, onClick }) => {
  return (
    <Container className={className} selected={selected} onClick={onClick}>
      {data.icon && <Icon type={data.icon} color="#808080" />}
      {data.icon && <Gap />}
      <Label>{data.label}</Label>
    </Container>
  );
};

ListItem.displayName = 'ListItem';

export default ListItem;
