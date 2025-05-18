// External imports
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface WalletContextProps {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  publicKey: PublicKey | null;
  isConnected: boolean;
  connection: Connection | null;
  error: string | null;
}

const WalletContext = createContext<WalletContextProps>({
  connect: async () => {},
  disconnect: async () => {},
  publicKey: null,
  isConnected: false,
  connection: null,
  error: null
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initializeConnection = useCallback(async () => {
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl('mainnet-beta');
      const conn = new Connection(rpcUrl, 'confirmed');
      setConnection(conn);
    } catch (err) {
      console.error('Failed to initialize connection:', err);
      setError('Failed to connect to Solana network');
    }
  }, []);

  const connect = async () => {
    if (typeof window === 'undefined' || !window.phantom?.solana) {
      setError('Phantom wallet not detected');
      return;
    }

    try {
      const response = await window.phantom.solana.connect();
      const pk = new PublicKey(response.publicKey.toString());
      setPublicKey(pk);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      console.error('Wallet connection error:', errorMessage);
      setError(errorMessage);
    }
  };

  const disconnect = async () => {
    try {
      if (window.phantom?.solana) {
        await window.phantom.solana.disconnect();
      }
      setPublicKey(null);
      setError(null);
    } catch (err) {
      console.error('Failed to disconnect wallet:', err);
      setError('Failed to disconnect wallet');
    }
  };

  // Initialize connection and set up event listeners
  useEffect(() => {
    let isMounted = true;

    const setup = async () => {
      try {
        await initializeConnection();

        // Auto-connect if previously connected
        if (typeof window !== 'undefined' && window.phantom?.solana?.isConnected) {
          try {
            const response = await window.phantom.solana.connect({ onlyIfTrusted: true });
            if (isMounted) {
              const pk = new PublicKey(response.publicKey.toString());
              setPublicKey(pk);
            }
          } catch (error) {
            console.error('Auto-connect failed:', error);
          }
        }
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    setup();

    // Set up event listeners
    const handleAccountChanged = (newPublicKey: { toString: () => string } | null) => {
      if (!isMounted) return;
      
      if (!newPublicKey) {
        setPublicKey(null);
        return;
      }
      
      try {
        setPublicKey(new PublicKey(newPublicKey.toString()));
      } catch (error) {
        console.error('Error parsing public key:', error);
        setError('Invalid account');
      }
    };

    const handleDisconnect = () => {
      if (isMounted) {
        setPublicKey(null);
      }
    };

    const cleanup = () => {
      isMounted = false;
      const solana = window.phantom?.solana;
      if (solana) {
        solana.off('accountChanged', handleAccountChanged);
        solana.off('disconnect', handleDisconnect);
      }
    };

    const solana = window.phantom?.solana;
    if (solana) {
      solana.on('accountChanged', handleAccountChanged);
      solana.on('disconnect', handleDisconnect);
    }

    return cleanup;
  }, [initializeConnection]);

  return (
    <WalletContext.Provider 
      value={{ 
        connect, 
        disconnect, 
        publicKey, 
        isConnected: !!publicKey, 
        connection,
        error
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
