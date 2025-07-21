# Term Deposit Calculator

A simple term deposit calculator that consume inputs:

- Start deposit amount (e.g. $10,000)
- Interest rate (e.g. 1.10%)
- Investment term (e.g. 3 years)
- Interest paid (monthly, quarterly, annually, at maturity)

And produces as output:

- Final balance (e.g. $10,330 on the above inputs, interest paid at maturity)

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test Files

```bash
# Business logic tests
npm test src/calculators/TermDeposit.test.ts

# Component tests
npm test src/components/TermDepositCalculator.test.tsx

# Main entry point tests
npm test src/main.test.tsx
```

### Test Coverage Report

The project maintains high test coverage:

- **Business Logic**: 100% coverage for calculator functions
- **Component Tests**: Rendering and functionality verification
- **Mathematical Accuracy**: Verified with real-world examples

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run all tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Formik** - Form handling and validation
- **Vitest** - Testing framework
- **Testing Library** - Component testing
- **Vite** - Build tool and dev server

## Design Decisions & Tradeoffs

### Architecture

- **Separation of Concerns**: Business logic separated from UI
- **Functional Components**: Modern React patterns for simplicity and maintainability

### Technology Choices

- **TypeScript**: Type safety over development speed
- **Formik**: Mature form handling with built-in validation (form validation was not introduced in this exercise)
- **Vitest**: Fast testing, requires Vite integration
- **Testing-Library/React**:

### Testing Strategy

- **Code Coverage**: Critical for financial calculations. For example, I found a bug with `AT_MATURITY` calculations after reviewing the math formula again.
- **Component Testing**: Focus on user behavior over implementation details, I use `@testing-library/react` for UI & DOM component testing.

### Future Considerations

- **Scalability**: Architecture supports additional financial calculators, and adopt feature-slice design pattern.
- **Internationalization**: To support multi-currency support, and `i18n` on all written content.
- **Accessibility**: Basic ARIA features are included, and we do need better form validation features.
- **State management**: To introduce better state management such as `redux-toolkit` / `redux`. Or caching library such as `@tanstack/react-query`.
