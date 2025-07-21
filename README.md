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

1. Clone the repository:

```bash
git clone <repository-url>
cd f-brianng-vpk75P
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

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
