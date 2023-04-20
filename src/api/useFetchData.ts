import { useQuery } from 'react-query';
import DataType from '../models/dataType';
import axios from 'axios';

const fetchData = async (): Promise<DataType[]> => {
  const response = await axios.get('/api/data');
  return response.data;
};

const useFetchData = () => {
  return useQuery<DataType[], Error>('data', fetchData);
};

export default useFetchData;
