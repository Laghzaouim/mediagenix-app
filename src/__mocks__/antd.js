import * as antd from 'antd';

const message = {
  ...antd.message,
  success: jest.fn(),
  error: jest.fn(),
};

export { message };
export * from 'antd';
