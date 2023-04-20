export default interface SchemaField {
  name: string | string[];
  label: string;
  component: 'text' | 'select' | 'range_picker' | 'textarea';
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
}
