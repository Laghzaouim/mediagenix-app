import { PropsWithChildren, useState } from 'react';
import AppContext from './AppContext';
import DataType from '../models/dataType';
import { useSubmitData } from '../api/useSubmitData';
import { queryClient } from '../api/queryClient';
import { showToast } from '../utils/toastUtil';

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Setting up state for the visibility of the modal and the search text
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Defining a mutation function to submit data to the API
  const { mutate } = useSubmitData({
    onSuccess: () => {
      // Invalidating the cache for the 'data' query on successful submission
      queryClient.invalidateQueries('data');
      // Showing a success toast notification
      showToast({ type: 'success', content: 'Event created successfully!' });
      // Toggling the modal visibility off
      toggleModal();
    },
  });

  // Defining a function to handle the search text
  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  // Defining a function to handle the form submission
  const handleSubmitForm = (values: DataType) => {
    mutate(values);
  };

  // Defining a function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  };

  // Rendering the AppContext Provider with necessary values and child components
  return (
    <AppContext.Provider
      value={{
        isModalVisible,
        toggleModal,
        searchText,
        handleSearch,
        handleFormSubmit: handleSubmitForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
