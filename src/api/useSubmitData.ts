// hooks/useSubmitData.ts
import { useMutation, UseMutationOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import DataType from '../models/dataType';

export const createData = async (data: DataType) => {
  const response = await axios.post<DataType>('/api/data', data);
  return response.data;
};

export const useSubmitData = (
  options: UseMutationOptions<DataType, AxiosError, DataType>
) => {
  return useMutation<DataType, AxiosError, DataType>(
    (data: DataType) => createData(data),
    options
  );
};
