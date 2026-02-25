# Contributing to WasteAI

Thank you for your interest in contributing to WasteAI! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- MongoDB (optional for local development)

### Setup
```bash
git clone https://github.com/SaiyamJain468/wasteai.git
cd wasteai
npm install
cp .env.example .env
npm run dev
```

## 📋 Development Workflow

### Branch Naming Convention
- `feature/` - New features (e.g., `feature/add-recycling-tips`)
- `fix/` - Bug fixes (e.g., `fix/classification-accuracy`)
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```
feat(classifier): add support for e-waste detection

- Implemented TensorFlow.js model for electronic waste
- Added confidence threshold of 85%
- Updated UI to show e-waste category

Closes #42
```

## 🧪 Testing Guidelines

### Running Tests
```bash
npm test
npm run test:coverage
```

### Writing Tests
- Write unit tests for all utility functions
- Add integration tests for API endpoints
- Ensure 80%+ code coverage
- Test edge cases and error handling

## 🎨 Code Style

### TypeScript/React
- Use functional components with hooks
- Follow ESLint configuration
- Use TypeScript strict mode
- Prefer named exports over default exports
- Keep components under 300 lines

### File Organization
```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── services/      # API service layer
├── utils/         # Helper functions
├── hooks/         # Custom React hooks
├── context/       # React context providers
└── config/        # Configuration files
```

## 🔍 Code Review Process

### Before Submitting PR
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No console.log statements
- [ ] Updated documentation
- [ ] Added/updated tests
- [ ] Tested on multiple browsers
- [ ] No TypeScript errors

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

## 🐛 Reporting Bugs

### Bug Report Template
```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches considered

**Additional Context**
Any other relevant information
```

## 🏗️ Architecture Guidelines

### Component Structure
```tsx
// 1. Imports
import React, { useState } from 'react';
import { Button } from '@/components';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export function MyComponent({ title }: Props) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {};
  
  // 6. Render
  return <div>{title}</div>;
}
```

### API Service Pattern
```typescript
// services/exampleService.ts
import api from './api';

export const exampleService = {
  getAll: () => api.get('/endpoint'),
  getById: (id: string) => api.get(`/endpoint/${id}`),
  create: (data: any) => api.post('/endpoint', data),
  update: (id: string, data: any) => api.put(`/endpoint/${id}`, data),
  delete: (id: string) => api.delete(`/endpoint/${id}`)
};
```

## 🔒 Security Guidelines

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Sanitize user inputs
- Implement rate limiting
- Use HTTPS in production
- Follow OWASP security practices

## 📚 Documentation

### Code Comments
- Use JSDoc for functions
- Explain "why" not "what"
- Keep comments up-to-date
- Document complex algorithms

### README Updates
- Update features list
- Add new dependencies
- Update setup instructions
- Include screenshots for UI changes

## 🎯 Performance Guidelines

- Optimize images (WebP format)
- Lazy load components
- Minimize bundle size
- Use React.memo for expensive components
- Implement code splitting
- Monitor Core Web Vitals

## 🌍 Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios
- Support reduced motion

## 📞 Getting Help

- GitHub Issues: Bug reports and feature requests
- Discussions: General questions and ideas
- Email: Saiyam468@gmail.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to WasteAI! Together we're building a cleaner Delhi NCR. 🌱**
