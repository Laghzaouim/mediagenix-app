import DynamicTable from './components/DynamicTable';
import DynamicForm from './components/DynamicForm';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import useFetchData from './api/useFetchData';
import { useSubmitData } from './api/useSubmitData';
import { queryClient } from './api/queryClient';
import SearchBar from './components/SearchBar';
import { showToast } from './utils/toast';
import schemaFields from './schemas/schemaFields';
import DataType from './models/dataType';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { data, isLoading } = useFetchData(searchText);
  const { mutate } = useSubmitData({
    onSuccess: () => {
      queryClient.invalidateQueries('data');
      setIsModalVisible(false);
      showToast({ type: 'success', content: 'Data submitted successfully!' });
    },
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: DataType) => {
    // Perform your HTTP calls for CREATE or UPDATE operations here
    console.log('Form submitted with values:', values);

    mutate(values);

    // Close the modal after a successful submission
    setIsModalVisible(false);
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Button type='primary' onClick={showModal}>
        Open Form
      </Button>
      <Modal
        title='Dynamic Form'
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <DynamicForm schema={schemaFields} onSubmit={handleSubmit} />
      </Modal>
      <DynamicTable
        schema={schemaFields}
        dataSource={data!}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
