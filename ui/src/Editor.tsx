import React, { useState } from 'react';
import styled from 'styled-components';
import { useIpcEventListener } from './util';
import { FileBrowser, FileDescriptor, PropertyEditor, Property } from './components';
const { ipcRenderer } = window.require('electron');

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
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

/*const mockData: FileDescriptor[] = [
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
];*/

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
  const [rootPath, setRootPath] = useState<string>();
  const [path, setPath] = useState<FileDescriptor[]>([]);
  const [files, setFiles] = useState<FileDescriptor[]>([]);
  useIpcEventListener(
    'folderOpened',
    (_event: unknown, args: unknown) => {
      const newRootPath = args as string;
      setRootPath(newRootPath);
      setPath([]);
      ipcRenderer.invoke('listFiles', [newRootPath, []]);
    },
    [setRootPath, setPath],
  );
  useIpcEventListener(
    'filesListed',
    (_event: unknown, args: unknown) => {
      setFiles(args as FileDescriptor[]);
    },
    [setFiles],
  );
  const handleDirectoryChanged = (newPath: FileDescriptor[]) => {
    setPath(newPath);
    ipcRenderer.invoke('listFiles', [rootPath, newPath.map(p => p.name)]);
  };
  return (
    <Container>
      <Left>
        <FileBrowser
          files={files}
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
