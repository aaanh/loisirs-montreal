# Contributing to Loisirs Montreal Helper

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/loisirs-montreal.git
   cd loisirs-montreal
   ```
3. Install pnpm
   ```bash
   npm i -g pnpm
   ```
4. Install dependencies:
   ```bash
   pnpm install
   ```
5. Start the development server:
   ```bash
   pnpm dev
   ```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### File Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature-specific components
├── data/               # Static data files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```


### Component Guidelines

- Filenames must be strictly lowercase, no exceptions
- Use kebab-case for file names
- Export components as named exports
- Include proper TypeScript interfaces
- Add JSDoc comments for complex components

### Testing

While unit and integration tests are not enforced, please:

- Test your changes thoroughly
- Ensure the app works on both desktop and mobile
- Verify that generated URLs are correct
- Test with different facility types and boroughs

## Making Changes

You must fork the repository to your account first.

### Creating a Feature

1. Create a new branch from `main`:
   ```bash
   git checkout -b <your-github-username>/<your-feature-name>
   ```
2. Make your changes
3. Test thoroughly
4. Commit with a descriptive message:
   ```bash
   git commit -m "<action> <what are affected by the action>"
   # e.g. add AI chatbot feature and relevant functions and/or components
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Process

1. Ensure your code follows the guidelines above
2. Update documentation if needed
3. Test on different devices and browsers
4. Create a pull request with a clear description
5. Wait for review and address any feedback

## Areas for Contribution

### High Priority
- Bug fixes and performance improvements
- Mobile UI enhancements
- Accessibility improvements
- Error handling

### Medium Priority
- New facility types or boroughs
- Additional search filters
- UI/UX improvements
- Code refactoring

### Low Priority
- Documentation updates
- Code style improvements
- Minor UI tweaks

## Getting Help

- Open an issue for bugs or feature requests
- Use GitHub Discussions for questions
- Check existing issues before creating new ones

## Code of Conduct

Please read and follow our [Code of Conduct](README.md#community-code-of-conduct) to ensure a welcoming environment for all contributors.

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.