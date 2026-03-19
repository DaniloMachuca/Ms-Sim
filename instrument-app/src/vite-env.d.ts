interface Window {
  electronAPI: {
    onDataUpdate: (callback: (data: any) => void) => void;
  };
}
