import DynamicTable from './components/DynamicTable';
import DynamicForm from './components/DynamicForm';
import SchemaFields from './schemas/SchemaFields';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import useFetchData from './api/useFetchData';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isLoading, error } = useFetchData();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    // Perform your HTTP calls for CREATE or UPDATE operations here
    console.log('Form submitted with values:', values);

    // Close the modal after a successful submission
    setIsModalVisible(false);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
