import React from 'react';
import styled from 'styled-components';
import { noop } from 'lodash';
import ListItem, { ItemData } from './ListItem';

interface Props {
  className?: string;
  items: ItemData[];
  selectionMode?: 'none' | 'single' | 'multiple';
  selection?: ItemData[];
  onSelectionChange?: (items: ItemData[]) => void;
}

const Container = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const List: React.FC<Props> = ({
  className,
  items,
  selectionMode = 'single',
  selection = [],
  onSelectionChange = noop,
}) => {
  const selectedIds = selection.map(item => item.id);
  const toggleSelection = (item: ItemData) => {
    if (selectionMode === 'single') {
      onSelectionChange(selectedIds.includes(item.id) ? [] : [item]);
    } else if (selectionMode === 'multiple') {
      onSelectionChange(
        selectedIds.includes(item.id)
          ? items.filter(i => i.id !== item.id && selectedIds.includes(i.id))
          : items.filter(i => i.id === item.id || selectedIds.includes(i.id)),
      );
    }
  };
  return (
    <Container className={className}>
      {items.map(item => (
        <ListItem
          key={item.id}
          data={item}
          selected={selectedIds.includes(item.id)}
          onClick={() => toggleSelection(item)}
        />
      ))}
    </Container>
  );
};

List.displayName = 'List';

export default List;
