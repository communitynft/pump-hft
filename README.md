# Pump.fun HFT Interface

A high-frequency trading interface for pump.fun built with Next.js, TypeScript, and Tailwind CSS. This application allows users to connect their Phantom wallet, view real-time market data, and execute trades with advanced strategies.

## Features

- 🔐 Phantom Wallet Integration
- 📊 Real-time Order Book Visualization
- ⚡ High-Frequency Trading Strategies
- 📈 Market Data Streaming
- 🎨 Responsive UI with Tailwind CSS

## Prerequisites

- Node.js 16.14+ (LTS recommended)
- npm or yarn
- Phantom Wallet browser extension

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/communitynft/pump-hft.git
   cd pump-hft
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   # Add other environment variables as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pump-hft/
├── src/
│   ├── app/               # Next.js 13+ app directory
│   ├── components/        # Reusable UI components
│   │   └── hft/          # HFT-specific components
│   ├── context/          # React context providers
│   ├── lib/              # Utility functions and configurations
│   └── styles/           # Global styles
├── public/               # Static files
└── tests/                # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This software is provided "as is" and any express or implied warranties, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose are disclaimed. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
