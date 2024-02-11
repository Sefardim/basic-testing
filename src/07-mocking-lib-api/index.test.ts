// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    ...originalModule,
    throttle: jest.fn((func) => func),
  };
});

describe('throttledGetDataFromApi', () => {
  const url = 'https://jsonplaceholder.typicode.com';
  const currentPath = '/users';

  const responseData = {
    data: {
      id: 1,
      userName: 'Mike',
    },
  };

  beforeEach(() => {
    axios.create = jest.fn().mockReturnThis();
    axios.get = jest.fn().mockResolvedValue(responseData);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(currentPath);

    expect(axios.create).toHaveBeenLastCalledWith({
      baseURL: url,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(currentPath);
    expect(axios.get).toHaveBeenCalledWith(currentPath);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(currentPath);
    expect(response).toEqual(responseData.data);
  });
});
