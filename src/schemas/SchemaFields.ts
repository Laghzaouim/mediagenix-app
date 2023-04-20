import SchemaField from '../models/SchemaField';

const SchemaFields: SchemaField[] = [
  {
    name: 'title',
    label: 'Title',
    component: 'text',
    required: true,
  },
  {
    name: 'type',
    component: 'select',
    label: 'Type',
    required: true,
    options: [
      {
        label: 'Generic',
        value: 'generic',
      },
      {
        label: 'Holiday',
        value: 'holiday',
      },
    ],
  },
  {
    name: ['startDate', 'endDate'],
    component: 'range_picker',
    label: 'Date',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    component: 'textarea',
    required: false,
  },
];

export default SchemaFields;
