import React, { useMemo } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import SchemaField from '../models/schemaField';
import DataType from '../models/dataType';
import { formatDateToISO } from '../utils/formatDates';

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

  const renderFormComponent = (field: SchemaField) => {
    const { component, options } = field;

    switch (component) {
      case 'text':
        return <Input />;
      case 'select':
        return (
          <Select>
            {options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      case 'range_picker':
        return <DatePicker.RangePicker />;
      case 'textarea':
        return <Input.TextArea />;
      default:
        return null;
    }
  };

  const renderedSchemaFields = useMemo(() => {
    return schema.map((field) => (
      <Form.Item
        key={field.name.toString()}
        label={field.label}
        name={field.component === 'range_picker' ? 'dateRange' : field.name}
        rules={[
          {
            required: field.required,
            message: `${field.label} is required`,
          },
        ]}
      >
        {renderFormComponent(field)}
      </Form.Item>
    ));
  }, [schema]);

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
