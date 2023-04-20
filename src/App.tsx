import DynamicTable from './components/DynamicTable';
import DynamicForm from './components/DynamicForm';
import SchemaFields from './schemas/SchemaFields';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import useFetchData from './api/useFetchData';
import { useSubmitData } from './api/useSubmitData';
import { queryClient } from './api/queryClient';
import SearchBar from './components/SearchBar';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isLoading, error } = useFetchData();
  const { mutate } = useSubmitData({
    onSuccess: () => {
      // Handle success, e.g., refetch data, show success message, close the modal
      queryClient.invalidateQueries('data');
      setIsModalVisible(false);
      console.log('Data saved successfully');
    },
    onError: () => {
      // Handle errors, e.g., show an error message
      console.error('Error saving data');
    },
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    // Perform your HTTP calls for CREATE or UPDATE operations here
    console.log('Form submitted with values:', values);

    mutate(values);

    // Close the modal after a successful submission
    setIsModalVisible(false);
  };

  const handleSearch = (searchText: string) => {
    console.log('🚀 ~ file: App.tsx:46 ~ App ~ searchText:', searchText);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <DynamicForm schema={SchemaFields} onSubmit={handleSubmit} />
      </Modal>
      {<DynamicTable schema={SchemaFields} dataSource={data!} />}
    </>
  );
}

export default App;
