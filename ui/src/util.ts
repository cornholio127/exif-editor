import { useCallback, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

export const useIpcEventListener = (
  channel: string,
  listener: (event: unknown, args: unknown[]) => void,
  deps: unknown[],
) => {
  const callback = useCallback(listener, deps);
  useEffect(() => {
    ipcRenderer.on(channel, callback);
    return () => {
      ipcRenderer.removeListener(channel, callback);
    };
  }, [callback]);
};
