import { message } from 'antd';

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: MessageType;
  content: string;
  duration?: number;
}

export const showToast = ({ type, content, duration = 5 }: ToastProps) => {
  message[type](content, duration);
};
