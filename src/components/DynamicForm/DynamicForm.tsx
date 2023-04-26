import React, { useContext } from 'react';
import { Form, Button, Modal } from 'antd';
import AppContext from '../../context/AppContext';
import DataType from '../../models/dataType';
import { formatDateToISO } from '../../utils/formatDatesUtil';
import { useRenderedSchemaFields } from '../../hooks/useRenderedSchemaFields';
import schemaFields from '../../schemas/schemaFields';

interface FormValues {
  title: string;
  type: string;
  dateRange: [string, string];
  description: string;
}

export const DynamicForm: React.FC = () => {
  const [form] = Form.useForm();
  const { handleFormSubmit, isModalVisible, toggleModal } =
    useContext(AppContext);

  const handleSubmit = (values: FormValues) => {
    const [startDate, endDate] = values.dateRange;

    const formattedValues: DataType = {
      title: values.title,
      type: values.type,
      startDate: formatDateToISO(startDate),
      endDate: formatDateToISO(endDate),
      description: values.description,
    };

    handleFormSubmit(formattedValues);
    form.resetFields();
  };

  const renderedSchemaFields = useRenderedSchemaFields({
    schema: schemaFields,
  });

  return (
    <Modal
      title='Create event'
      open={isModalVisible}
      onCancel={toggleModal}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        {renderedSchemaFields}
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
