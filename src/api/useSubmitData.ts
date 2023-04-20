import { useMutation, UseMutationOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import DataType from '../models/dataType';
import { showToast } from '../utils/toast';

export const createData = async (data: DataType) => {
  const response = await axios.post<DataType>('/api/data', data);
  return response.data;
};

export const useSubmitData = (
  options: UseMutationOptions<DataType, AxiosError, DataType>
) => {
  const defaultOptions: UseMutationOptions<DataType, AxiosError, DataType> = {
    onError: (error) => {
      showToast({ type: 'error', content: `Error: ${error.message}` });
    },
  };

  const combinedOptions = { ...defaultOptions, ...options };

  return useMutation<DataType, AxiosError, DataType>(
    (data: DataType) => createData(data),
    combinedOptions
  );
};
