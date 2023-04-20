import React from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import SchemaField from '../models/SchemaField';
import DataType from '../models/dataType';
import moment from 'moment';

interface DynamicFormProps {
  schema: SchemaField[];
  onSubmit: (values: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    const [startDate, endDate] = values.startDate.endDate;

    const formattedValues: DataType = {
      ...values,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    };

    onSubmit(formattedValues);
    console.log(
      '🚀 ~ file: DynamicForm.tsx:15 ~ handleSubmit ~ values:',
      JSON.stringify(formattedValues)
    );
    form.resetFields();
  };

  const renderField = (field: SchemaField) => {
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

  return (
    <Form form={form} onFinish={handleSubmit}>
      {schema.map((field) => (
        <Form.Item
          key={field.name.toString()}
          label={field.label}
          name={field.name}
          rules={[
            { required: field.required, message: `${field.label} is required` },
          ]}
        >
          {renderField(field)}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
