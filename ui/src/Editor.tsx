import { FileDescriptor } from 'components/FileBrowser';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FileBrowser } from './components';
import PropertyEditor, { Property } from './components/PropertyEditor';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: #cc0000;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  flex-shrink: 0;
  flex-grow: 0;
  background: #cccc66;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #efefef;
  padding: 0 16px;
`;

const mockData: FileDescriptor[] = [
  {
    name: 'image484.dng',
    path: '/',
    isDirectory: false,
  },
  {
    name: '20210603',
    path: '/',
    isDirectory: true,
  },
  {
    name: 'image487.dng',
    path: '/',
    isDirectory: false,
  },
  {
    name: 'image491.dng',
    path: '/',
    isDirectory: false,
  },
  {
    name: '20210527',
    path: '/',
    isDirectory: true,
  },
];

const properties: Property[] = [
  {
    id: '1',
    label: 'Exposure',
    value: '1/400',
  },
  {
    id: '2',
    label: 'Camera make',
    value: 'Nikon',
  },
];

const Editor: React.FC = () => {
  const [selection, setSelection] = useState<FileDescriptor[]>([]);
  const [path, setPath] = useState<FileDescriptor[]>([]);
  const handleDirectoryChanged = (path: FileDescriptor[]) => {
    // TODO: change directory
    setPath(path);
  };
  return (
    <Container>
      <Left>
        <FileBrowser
          files={mockData}
          selection={selection}
          onSelectionChange={setSelection}
          path={path}
          onDirectoryChange={handleDirectoryChanged}
        />
      </Left>
      <Main>
        <h1>{selection.length === 1 && selection[0].name}</h1>
        <PropertyEditor properties={selection.length === 1 ? properties : []} />
      </Main>
    </Container>
  );
};

Editor.displayName = 'Editor';

export default Editor;