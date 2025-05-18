// Global type declarations for the application

type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom: boolean;
        isConnected: boolean;
        connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{
          publicKey: {
            toString: () => string;
            toBytes: () => Uint8Array;
          };
        }>;
        disconnect: () => Promise<void>;
        on: (event: PhantomEvent, handler: (args: { publicKey?: { toString: () => string } }) => void) => void;
        off: (event: PhantomEvent, handler: (args: unknown) => void) => void;
      };
    };
  }
}

export {}; // This file needs to be a module
