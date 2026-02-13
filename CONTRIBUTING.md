# Contributing to KashPilot

We love your input! We want to make contributing to KashPilot as easy and transparent as possible.

## Development Setup

1. Fork the repo
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/amazing-feature`
5. Make your changes
6. Test thoroughly
7. Commit: `git commit -m 'Add amazing feature'`
8. Push: `git push origin feature/amazing-feature`
9. Open a Pull Request

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Component Structure

\`\`\`typescript
// Good component structure
export default function MyComponent() {
  // 1. State declarations
  const [state, setState] = useState()
  
  // 2. Effects
  useEffect(() => {}, [])
  
  // 3. Event handlers
  const handleClick = () => {}
  
  // 4. Render
  return <div>...</div>
}
\`\`\`

### Naming Conventions

- Components: PascalCase (e.g., `AgentPanel.tsx`)
- Functions: camelCase (e.g., `getAgentStatus`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- Files: kebab-case or camelCase (e.g., `agent-runner.js`)

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests

Examples:
\`\`\`
feat: add agent autopilot mode
fix: resolve transaction history bug
docs: update README with new features
style: format code with prettier
refactor: simplify agent decision logic
test: add unit tests for wallet utils
\`\`\`

## Testing

### Before Submitting PR

- [ ] Code builds without errors
- [ ] No TypeScript errors
- [ ] All features work as expected
- [ ] No console errors in browser
- [ ] Responsive on mobile
- [ ] Documentation updated

### Testing Checklist

\`\`\`bash
# Build test
npm run build

# Lint test
npm run lint

# Type check
npx tsc --noEmit
\`\`\`

## Pull Request Process

1. Update README.md with details of changes if needed
2. Update the CHANGELOG.md with your changes
3. Make sure all tests pass
4. Get approval from at least one maintainer
5. Maintainer will merge the PR

## Areas for Contribution

### High Priority
- [ ] Unit tests for core functions
- [ ] Integration tests for API routes
- [ ] Additional agent modes
- [ ] Performance optimizations
- [ ] Security improvements

### Medium Priority
- [ ] UI/UX enhancements
- [ ] Additional chart/analytics
- [ ] Mobile app
- [ ] Browser extension
- [ ] Multi-language support

### Low Priority
- [ ] Documentation improvements
- [ ] Code refactoring
- [ ] Example configurations
- [ ] Video tutorials

## Feature Requests

We use GitHub issues to track feature requests. Include:

1. **Clear description** of the feature
2. **Use case** - why is this needed?
3. **Expected behavior** - what should happen?
4. **Mockups** - if UI related
5. **Technical approach** - if you have ideas

## Bug Reports

Report bugs using GitHub issues. Include:

1. **Title** - clear, specific summary
2. **Description** - detailed explanation
3. **Steps to reproduce** - numbered list
4. **Expected behavior** - what should happen
5. **Actual behavior** - what actually happens
6. **Screenshots** - if applicable
7. **Environment** - OS, browser, Node version
8. **Logs** - relevant error messages

Template:
\`\`\`markdown
**Bug Description**
A clear description of the bug.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 18.17.0]

**Additional Context**
Any other relevant information.
\`\`\`

## Code Review Process

Maintainers will review your PR and may:

- Approve and merge
- Request changes
- Ask questions
- Suggest improvements

Please be patient - reviews take time!

## Community

- Be respectful and constructive
- Help others when you can
- Share your knowledge
- Give credit where due

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to ask questions in:
- GitHub Issues
- GitHub Discussions
- Discord server

Thank you for contributing to KashPilot.
