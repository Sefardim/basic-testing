// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const addTestCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
];

const subtractTestCases = [
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 6, b: 1, action: Action.Subtract, expected: 5 },
];

const multiplyTestCases = [
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
];

const divideTestCases = [
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
];

const exponentiateTestCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
];

const incorrectTestCases = [
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 2, b: '2', action: Action.Add, expected: null },
  { a: {}, b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(addTestCases)(
    'should add two numbers: given arguments %p, %p and action %s, should return %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );

  test.each(subtractTestCases)(
    'should subtract two numbers: given arguments %p, %p and action %s, should return %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );

  test.each(multiplyTestCases)(
    'should multiply two numbers: given arguments %p, %p and action %s, should return %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );

  test.each(divideTestCases)(
    'should divide two numbers: given arguments %p, %p and action %s, should return %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );

  test.each(exponentiateTestCases)(
    'should exponentiate two numbers: given arguments %p, %p and action %s, should return %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );

  test.each(incorrectTestCases)(
    'should return null: given arguments %p, %p and action %s, should return %o',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );
});
