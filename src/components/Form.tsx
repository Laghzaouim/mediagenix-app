import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import FormValues from '../models/formValues';
import FormSchema from '../models/formSchema';

interface Props {
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  formSchema: FormSchema[];
}

const FormComponent: React.FC<Props> = ({ onClose, onSubmit, formSchema }) => {
  const [form] = useForm();

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
    form.resetFields();
    onClose();
  };

  const getFormItemComponent = (
    component: FormSchema['component'],
    label: FormSchema['label'],
    options?: FormSchema['options']
  ) => {
    switch (component) {
      case 'text':
        return <Input placeholder={label} />;
      case 'select':
        return (
          <Select placeholder={label}>
            {options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      case 'range_picker':
        return <DatePicker.RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />;
      case 'textarea':
        return <TextArea rows={4} placeholder={label} />;
      default:
        return <Input placeholder={label} />;
    }
  };

  const renderFormItems = () => {
    return formSchema.map(({ name, label, component, required, options }) => (
      <Form.Item
        key={name.toString()}
        label={label}
        name={name}
        rules={[
          { required, message: `Please input the ${label.toLowerCase()}` },
        ]}
      >
        {getFormItemComponent(component, label, options)}
      </Form.Item>
    ));
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      {renderFormItems()}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Save
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
            onClose();
          }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
