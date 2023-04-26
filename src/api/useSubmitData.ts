import { useMutation, UseMutationOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import DataType from '../models/dataType';
import { showToast } from '../utils/toastUtil';

export const createData = async (data: DataType) => {
  const response = await axios.post<DataType>('/api/data', data);
  return response.data;
};

// Custom hook that uses the useMutation hook from the react-query library to submit data
export const useSubmitData = (
  options: UseMutationOptions<DataType, AxiosError, DataType> // Options for the useMutation hook
) => {
  // Default options for the useMutation hook
  const defaultOptions: UseMutationOptions<DataType, AxiosError, DataType> = {
    onError: (error) => {
      // Displaying an error toast message using the showToast utility function
      showToast({ type: 'error', content: `Error: ${error.message}` });
    },
  };

  // Combining the default options and the options passed to the hook
  const combinedOptions = { ...defaultOptions, ...options };

  // Using the useMutation hook to submit the data
  return useMutation<DataType, AxiosError, DataType>(
    (data: DataType) => createData(data), // Function that creates the data by making a POST request
    combinedOptions
  );
};
