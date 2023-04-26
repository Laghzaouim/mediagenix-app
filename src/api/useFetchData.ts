import { useQuery } from 'react-query';
import DataType from '../models/dataType';
import axios from 'axios';
import { showToast } from '../utils/toastUtil';

const fetchData = async (search?: string): Promise<DataType[]> => {
  // Making a GET request to the /api/data endpoint with the 'search' query parameter
  const response = await axios.get('/api/data', {
    params: { search },
  });
  return response.data;
};

// Custom hook that uses the useQuery hook from the react-query library to fetch data
const useFetchData = (search?: string) => {
  return useQuery<DataType[], Error>(
    ['data', search], // Array of dependencies for the query cache
    () => fetchData(search),
    {
      keepPreviousData: true, // Option to keep previous data while fetching new data
      onError: (error) => {
        // Displaying an error toast message using the showToast utility function
        showToast({ type: 'error', content: `Error: ${error.message}` });
      },
    }
  );
};

export default useFetchData;
