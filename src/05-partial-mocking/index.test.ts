// Uncomment the code below and write your tests
// import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(() => undefined),
    mockTwo: jest.fn(() => undefined),
    mockThree: jest.fn(() => undefined),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyMethod = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(spyMethod).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spyMethod = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spyMethod).toHaveBeenCalled();
  });
});
