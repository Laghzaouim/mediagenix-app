import { PropsWithChildren, useState } from 'react';
import AppContext from './AppContext';
import DataType from '../models/dataType';
import { useSubmitData } from '../api/useSubmitData';
import { queryClient } from '../api/queryClient';
import { showToast } from '../utils/toastUtil';

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { mutate } = useSubmitData({
    onSuccess: () => {
      queryClient.invalidateQueries('data');
      showToast({ type: 'success', content: 'Event created successfully!' });
      toggleModal();
    },
  });

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleSubmitForm = (values: DataType) => {
    mutate(values);
  };

  const toggleModal = () => {
    setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  };

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
