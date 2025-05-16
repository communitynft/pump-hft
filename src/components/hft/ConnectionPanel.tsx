import { useWallet } from '../../context/WalletContext';

export default function ConnectionPanel() {
  const { connect, disconnect, isConnected, publicKey } = useWallet();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      {!isConnected ? (
        <button
          onClick={connect}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Phantom Wallet
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm">
            Connected: {publicKey?.toBase58().slice(0, 6)}...
          </span>
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
