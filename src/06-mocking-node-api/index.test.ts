import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

// const mockSetTimeout = jest.spyOn(global, 'setTimeout');
// const mockSetInterval = jest.spyOn(global, 'setInterval');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 4000);

    expect(mockSetTimeout).toHaveBeenLastCalledWith(expect.any(Function), 4000);
    expect(mockSetTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 500);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(mockSetTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockSetInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 4000);

    expect(mockSetInterval).toHaveBeenCalledTimes(1);
    expect(mockSetInterval).toHaveBeenLastCalledWith(callback, 4000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const intervalTime = 500;

    doStuffByInterval(callback, intervalTime);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(intervalTime);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(intervalTime);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(intervalTime);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const mockPath = 'test.txt';

    await readFileAsynchronously(mockPath);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const mockPath = 'test.txt';
    const result = await readFileAsynchronously(mockPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('Hello world!');

    const mockPath = 'test.txt';
    const result = await readFileAsynchronously(mockPath);

    expect(result).toBe('Hello world!');
  });
});
