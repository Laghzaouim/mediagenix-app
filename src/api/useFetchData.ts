import { useQuery } from 'react-query';
import DataType from '../models/dataType';

const fetchData = async (): Promise<DataType[]> => {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};

const useFetchData = () => {
  return useQuery<DataType[], Error>('data', fetchData);
};

export default useFetchData;
