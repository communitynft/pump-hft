# 🚀 Pump.fun HFT Interface

A high-frequency trading interface for pump.fun built with Next.js, TypeScript, and Tailwind CSS. This application allows users to connect their Phantom wallet, view real-time market data, and execute trades with advanced strategies.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD](https://github.com/communitynft/pump-hft/actions/workflows/ci.yml/badge.svg)](https://github.com/communitynft/pump-hft/actions)
[![codecov](https://codecov.io/gh/communitynft/pump-hft/graph/badge.svg?token=d725986f-d082-444b-9b3b-3b91f12e1564)](https://codecov.io/gh/communitynft/pump-hft)

## ✨ Features

- 🔐 **Phantom Wallet Integration** - Seamlessly connect with Phantom wallet
- 📊 **Real-time Order Book** - Visualize market depth and liquidity
- ⚡ **HFT Strategies** - Implement and execute high-frequency trading strategies
- 📈 **Market Data Streaming** - Real-time price and volume data
- 🎨 **Responsive UI** - Built with Tailwind CSS for all device sizes
- 🛡️ **Type Safety** - Full TypeScript support for better developer experience
- 🚀 **CI/CD** - Automated testing and deployment with GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x (LTS recommended)
- npm or yarn
- Phantom Wallet browser extension

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/communitynft/pump-hft.git
   cd pump-hft
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Required
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   
   # Optional (for development)
   NEXT_PUBLIC_VERCEL_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── .github/workflows/    # GitHub Actions workflows
├── public/               # Static files
├── src/
│   ├── app/             # Next.js app router
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── lib/              # Utility functions and HFT logic
│   ├── styles/           # Global styles and Tailwind config
│   └── types/            # TypeScript type definitions
├── .env.local           # Environment variables (gitignored)
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Deployment

### Vercel (Recommended)

1. **Push your code** to a GitHub repository
2. **Import the project** in [Vercel](https://vercel.com/import)
3. **Configure environment variables** in Vercel dashboard:
   ```env
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   # Add other required environment variables
   ```
4. **Deploy!** Vercel will automatically deploy on every push to `main`

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_SOLANA_NETWORK` | | - | Solana network (e.g., 'mainnet-beta', 'devnet') |
| `NEXT_PUBLIC_VERCEL_URL` | | - | Used for generating absolute URLs |

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Phantom Wallet](https://phantom.app/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Disclaimer

This software is provided "as is" and any express or implied warranties, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose are disclaimed. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
