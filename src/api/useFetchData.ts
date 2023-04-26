import { useQuery } from 'react-query';
import DataType from '../models/dataType';
import axios from 'axios';
import { showToast } from '../utils/toastUtil';

const fetchData = async (search?: string): Promise<DataType[]> => {
  const response = await axios.get('/api/data', {
    params: { search },
  });
  return response.data;
};

const useFetchData = (search?: string) => {
  return useQuery<DataType[], Error>(
    ['data', search],
    () => fetchData(search),
    {
      keepPreviousData: true,
      onError: (error) => {
        showToast({ type: 'error', content: `Error: ${error.message}` });
      },
    }
  );
};

export default useFetchData;
