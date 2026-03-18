export {};

declare global {
  interface Window {
    electronAPI: {
      writeData: (airspeed: number, vs: number) => void;
    };
  }
}
