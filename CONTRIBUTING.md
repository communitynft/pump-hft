# Contributing to Pump.fun HFT Interface

Thank you for your interest in contributing! We welcome all contributions from the community.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Run tests and linters
6. Commit and push your changes
7. Open a pull request

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file based on `.env.example`

3. Start the development server:
   ```bash
   npm run dev
   ```

## Code Style

- Follow the [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- Use [Prettier](https://prettier.io/) for code formatting
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.
