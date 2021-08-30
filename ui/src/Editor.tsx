import React, { useState } from 'react';
import styled from 'styled-components';
import { useIpcEventListener } from './util';
import { FileBrowser, FileDescriptor, PropertyEditor, MetadataEntry } from './components';
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

const Footer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  height: 16px;
`;

const Editor: React.FC = () => {
  const [selection, setSelection] = useState<FileDescriptor[]>([]);
  const [rootPath, setRootPath] = useState<string>();
  const [path, setPath] = useState<FileDescriptor[]>([]);
  const [files, setFiles] = useState<FileDescriptor[]>([]);
  const [properties, setProperties] = useState<MetadataEntry[]>([]);
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
  useIpcEventListener(
    'metadata',
    (_event: unknown, args: unknown) => {
      setProperties(args as MetadataEntry[]);
    },
    [setProperties],
  );
  const handleSelectionChanged = (newSelection: FileDescriptor[]) => {
    setSelection(newSelection);
    if (newSelection.length === 1) {
      ipcRenderer.invoke('readMetadata', [newSelection[0].path, newSelection[0].name]);
    }
  };
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
          onSelectionChange={handleSelectionChanged}
          path={path}
          onDirectoryChange={handleDirectoryChanged}
        />
      </Left>
      <Main>
        <h1>{selection.length === 1 && selection[0].name}</h1>
        <PropertyEditor properties={selection.length === 1 ? properties : []} />
        <Footer></Footer>
      </Main>
    </Container>
  );
};

Editor.displayName = 'Editor';

export default Editor;
