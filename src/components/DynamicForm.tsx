import React from 'react';
import { Form, Button } from 'antd';
import SchemaField from '../models/schemaField';
import DataType from '../models/dataType';
import { formatDateToISO } from '../utils/formatDates';
import { useRenderedSchemaFields } from '../hooks/useRenderedSchemaFields';

interface FormValues {
  title: string;
  type: string;
  dateRange: [string, string];
  description: string;
}

interface DynamicFormProps {
  schema: SchemaField[];
  onSubmit: (values: DataType) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: FormValues) => {
    const [startDate, endDate] = values.dateRange;

    const formattedValues: DataType = {
      title: values.title,
      type: values.type,
      startDate: formatDateToISO(startDate),
      endDate: formatDateToISO(endDate),
      description: values.description,
    };

    onSubmit(formattedValues);
    form.resetFields();
  };

  const renderedSchemaFields = useRenderedSchemaFields({ schema });

  return (
    <Form form={form} onFinish={handleFormSubmit}>
      {renderedSchemaFields}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(DynamicForm);
