This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setting up front end
1. Install nodejs https://nodejs.org/en (we are using v22 LTS)
2. cd into `eventic-fe`
3. Run `npm install


## Getting Started
After you start the development server, you can proceed.


Open [http://127.0.0.1:3000](http://127.0.0.1:3000) with your browser to see the result.
- DO NOT use localhost

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Test with Jest
## Where to put test files
Create test files inside the `components/__tests__` directory. This folder should mirrors the structure of the `components` folder. 
For example, if your component is in `components/Button.tsx`, then your test file should be in `components/__tests__/Button.test.tsx`.

## How to create test files.
Name a test file `*.test.tsx` first.
Each test file should include at least one `test()` function:
```tsx
import { render, screen } from '@testing-library/react';
import Component from '@**/**/Component';

test('Component Test - Case 1', () => {
    render(<Component {...}/>);
    expect(screen.getByText(...)).toBeInTheDocument();
});
```

To include multiple tests for different test cases for one component/function, you can use `describe()`:
```tsx
describe('Component Tests', () => {
    test('Test case 1', () => {...});
    test('Test case 2', () => {...});
});
```

You can also use `test.each()` for the different inputs for one component/function:
```tsx
test.each([
    ['1000', '1000.00'],
    ['1,500.5', '1500.50'],
    {...}
])('formatPrice("%s") -> %s', (input, expected) => {
    expect(formatPrice(input)).toBe(expected);
});
```
## Unit test for complicated components
Some components may involve external logic like Flask API or contain heavy `useEffect()`. For such components, it's a good idea to **split the logic into smaller, testable parts**.
For instance, you can divide them into some parts:
- Fetching data
- Processing the data
- Rendering the UI

`useEffect()` with frequent re-renders can make tests unstable/impossible. Additionally, while you divide components for unit testing, the component structures can be well-organized👍

## Run test command
Stop the React server first, and then run test:
```bash
npm test
# or
npm test -- {part of the test file name(i.e. Component.test)}
```

## Currently installed tools (You can add if you install other modules/tools)
- Jest
- React Testing Library
- jest-dom
- user-event
- ts-jest