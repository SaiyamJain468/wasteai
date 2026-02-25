# Testing Guide

## Overview
This document outlines the testing strategy and guidelines for WasteAI.

## Testing Stack
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Jest + Supertest
- **E2E Tests**: Cypress (planned)
- **Coverage**: Jest Coverage Reports

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm test -- --watch
```

### Coverage Report
```bash
npm test -- --coverage
```

### Specific Test File
```bash
npm test -- wasteClassifier.test.ts
```

## Test Structure

### Unit Tests
Located in `__tests__` directories or `.test.ts` files next to source files.

```typescript
// Example: utils/wasteClassifier.test.ts
import { classifyWaste } from './wasteClassifier';

describe('wasteClassifier', () => {
  describe('classifyWaste', () => {
    it('should classify plastic bottle as recyclable', () => {
      const result = classifyWaste('plastic bottle');
      expect(result.type).toBe('recyclable');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should classify banana peel as organic', () => {
      const result = classifyWaste('banana peel');
      expect(result.type).toBe('organic');
    });

    it('should classify battery as hazardous', () => {
      const result = classifyWaste('battery');
      expect(result.type).toBe('hazardous');
    });
  });
});
```

### Component Tests
```typescript
// Example: components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### API Tests
```typescript
// Example: server/controllers/auth.test.ts
import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          ward: 'Connaught Place'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('test@example.com');
      expect(response.body.data.token).toBeDefined();
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          password: 'password123',
          ward: 'Connaught Place'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
```

## Coverage Goals

| Type | Target | Current |
|------|--------|---------|
| Statements | 80% | TBD |
| Branches | 75% | TBD |
| Functions | 80% | TBD |
| Lines | 80% | TBD |

## Testing Best Practices

### 1. Test Naming
```typescript
// Good
it('should return recyclable for plastic bottle', () => {});

// Bad
it('test1', () => {});
```

### 2. Arrange-Act-Assert Pattern
```typescript
it('should calculate points correctly', () => {
  // Arrange
  const wasteType = 'recyclable';
  
  // Act
  const points = calculatePoints(wasteType);
  
  // Assert
  expect(points).toBe(10);
});
```

### 3. Test One Thing
```typescript
// Good
it('should validate email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
});

it('should reject invalid email', () => {
  expect(isValidEmail('invalid')).toBe(false);
});

// Bad
it('should validate email', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('invalid')).toBe(false);
  expect(isValidEmail('')).toBe(false);
});
```

### 4. Use Descriptive Assertions
```typescript
// Good
expect(user.points).toBe(150);

// Bad
expect(user.points).toBeTruthy();
```

### 5. Mock External Dependencies
```typescript
import { classifyImage } from './api';

jest.mock('./api');

it('should handle API errors', async () => {
  (classifyImage as jest.Mock).mockRejectedValue(new Error('Network error'));
  
  const result = await handleClassification(image);
  
  expect(result.error).toBe('Network error');
});
```

## Test Categories

### Critical Path Tests
- User authentication
- Image classification
- Points calculation
- Data persistence

### Edge Cases
- Empty inputs
- Invalid data types
- Network failures
- Large file uploads
- Concurrent requests

### Performance Tests
- Classification speed (< 2s)
- API response time (< 500ms)
- Bundle size (< 500KB)
- Memory usage

## Continuous Integration

Tests run automatically on:
- Every push to main/develop
- Every pull request
- Before deployment

### CI Pipeline
```yaml
1. Install dependencies
2. Run linter
3. Run type checker
4. Run unit tests
5. Run integration tests
6. Generate coverage report
7. Build application
8. Deploy (if tests pass)
```

## Manual Testing Checklist

### Before Release
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test offline functionality
- [ ] Test image upload (various formats)
- [ ] Test authentication flow
- [ ] Test leaderboard updates
- [ ] Test quiz functionality
- [ ] Test history calendar
- [ ] Test impact report generation
- [ ] Test responsive design
- [ ] Test accessibility (screen reader)
- [ ] Test performance (Lighthouse)

### Regression Testing
- [ ] Existing features still work
- [ ] No console errors
- [ ] No broken links
- [ ] No visual regressions

## Test Data

### Test Users
```javascript
const testUsers = [
  {
    email: 'test@wasteai.com',
    password: 'test123',
    ward: 'Connaught Place'
  },
  {
    email: 'admin@wasteai.com',
    password: 'admin123',
    ward: 'Dwarka'
  }
];
```

### Test Images
Located in `test/fixtures/images/`:
- `plastic-bottle.jpg` - Recyclable
- `banana-peel.jpg` - Organic
- `battery.jpg` - Hazardous
- `invalid.txt` - Invalid format

## Debugging Tests

### Run Single Test
```bash
npm test -- -t "should classify plastic bottle"
```

### Debug in VS Code
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

### Verbose Output
```bash
npm test -- --verbose
```

## Future Testing Plans

### Phase 2
- [ ] E2E tests with Cypress
- [ ] Visual regression tests
- [ ] Load testing
- [ ] Security testing

### Phase 3
- [ ] A/B testing framework
- [ ] Chaos engineering
- [ ] Performance monitoring
- [ ] User behavior analytics

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Last Updated**: January 2025
