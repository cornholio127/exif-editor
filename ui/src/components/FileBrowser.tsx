import React from 'react';
import styled from 'styled-components';
import { noop } from 'lodash';
import List from './List';
import { ItemData } from './ListItem';
import IconButton from './IconButton';

export interface FileDescriptor {
  name: string;
  path: string;
  isDirectory: boolean;
}

interface Props {
  className?: string;
  files: FileDescriptor[];
  path: FileDescriptor[];
  selection?: FileDescriptor[];
  onSelectionChange?: (selection: FileDescriptor[]) => void;
  onDirectoryChange?: (path: FileDescriptor[]) => void;
}

interface FdItemData extends ItemData {
  fd: FileDescriptor;
}

const Directory = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #808080;
  padding-left: 8px;
  justify-content: space-between;
  height: 32px;
`;

const Path = styled.span`
  user-select: none;
  color: #b8b8b8;
  font-size: 14px;
`;

const toItemData = (fd: FileDescriptor): FdItemData => ({
  id: fd.name,
  label: fd.name,
  icon: fd.isDirectory ? 'folder' : 'image',
  fd,
});

const fromItemData = (itemData: ItemData): FileDescriptor => (itemData as FdItemData).fd;

const itemComparator = (item1: FdItemData, item2: FdItemData): number => {
  if (item1.fd.isDirectory === item2.fd.isDirectory) {
    return item1.label.localeCompare(item2.label);
  }
  return item1.fd.isDirectory ? -1 : 1;
};

const FileBrowser: React.FC<Props> = ({
  className,
  files,
  path,
  selection = [],
  onSelectionChange = noop,
  onDirectoryChange = noop,
}) => {
  const handleSelectionChange = (items: ItemData[]) => {
    const fdItems = items.map(fromItemData);
    if (fdItems.length === 1 && fdItems[0].isDirectory) {
      onDirectoryChange(path.concat([fdItems[0]]));
      onSelectionChange([]);
    } else {
      onSelectionChange(fdItems);
    }
  };
  return (
    <div className={className}>
      <Directory>
        <Path>
          {path.length > 1 && '... / '}
          {path.length === 0 ? 'Root' : path[path.length - 1].name}
        </Path>
        {path.length > 0 && (
          <IconButton icon="arrow-up" onClick={() => onDirectoryChange(path.slice(0, path.length - 1))} />
        )}
      </Directory>
      <List
        items={files.map(toItemData).sort(itemComparator)}
        selection={selection.map(toItemData)}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
};

export default FileBrowser;
