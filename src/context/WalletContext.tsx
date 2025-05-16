import { Connection, PublicKey } from '@solana/web3.js';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type WalletContextProps = {
  connect: () => Promise<void>;
  disconnect: () => void;
  publicKey: PublicKey | null;
  isConnected: boolean;
  connection: Connection | null;
};

const WalletContext = createContext<WalletContextProps>({
  connect: async () => {},
  disconnect: () => {},
  publicKey: null,
  isConnected: false,
  connection: null
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);

  const initializeConnection = async () => {
    const conn = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com'
    );
    setConnection(conn);
  };

  const connect = async () => {
    if (typeof window !== 'undefined' && window.phantom?.solana) {
      try {
        const { publicKey } = await window.phantom.solana.connect();
        setPublicKey(new PublicKey(publicKey));
      } catch (error) {
        console.error('Wallet connection error:', error);
      }
    }
  };

  const disconnect = () => {
    window.phantom?.solana.disconnect();
    setPublicKey(null);
  };

  useEffect(() => {
    initializeConnection();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
        publicKey,
        isConnected: !!publicKey,
        connection
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
