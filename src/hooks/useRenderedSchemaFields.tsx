import { useMemo } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import SchemaField from '../models/schemaField';

interface UseRenderedSchemaFieldsProps {
  schema: SchemaField[];
}

export const useRenderedSchemaFields = ({ schema }: UseRenderedSchemaFieldsProps): JSX.Element[] => {
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
        return <DatePicker.RangePicker  />;
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

  return renderedSchemaFields;
};
