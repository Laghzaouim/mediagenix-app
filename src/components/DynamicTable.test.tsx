import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DynamicTable from './DynamicTable';
import SchemaField from '../models/schemaField';
import DataType from '../models/dataType';

// Mock data for testing
const schema: SchemaField[] = [
  {
    name: 'title',
    label: 'Title',
    component: 'text',
  },
  {
    name: 'type',
    label: 'Type',
    component: 'select',
  },
  {
    name: 'startDate',
    label: 'Start Date',
    component: 'range_picker',
  },
  {
    name: 'endDate',
    label: 'End Date',
    component: 'range_picker',
  },
  {
    name: 'description',
    label: 'Description',
    component: 'textarea',
  },
];

const dataSource: DataType[] = [
  {
    id: '1',
    title: 'Test 1',
    type: 'A',
    startDate: '2023-04-01',
    endDate: '2023-04-30',
    description: 'Test 1 description',
  },
  {
    id: '2',
    title: 'Test 2',
    type: 'B',
    startDate: '2023-04-15',
    endDate: '2023-05-14',
    description: 'Test 2 description',
  },
];

describe('DynamicTable', () => {
  test('renders table with correct headers on load', async () => {
    render(
      <DynamicTable schema={schema} dataSource={dataSource} isLoading={false} />
    );

    expect(await screen.findByText('Title')).toBeInTheDocument()
    expect(await screen.findByText('Type')).toBeInTheDocument();
    expect(await screen.findByText('Start Date')).toBeInTheDocument();
    expect(await screen.findByText('End Date')).toBeInTheDocument();
    expect(await screen.findByText('Description')).toBeInTheDocument();
  });

  test('table is filled in with the correct data', async () => {
    render(
      <DynamicTable schema={schema} dataSource={dataSource} isLoading={false} />
    );

    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(3); // 1 header row + 2 data rows

    // Check the first data row
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('2023-04-01')).toBeInTheDocument();
    expect(screen.getByText('2023-04-30')).toBeInTheDocument();
    expect(screen.getByText('Test 1 description')).toBeInTheDocument();

    // Check the second data row
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('2023-04-15')).toBeInTheDocument();
    expect(screen.getByText('2023-05-14')).toBeInTheDocument();
    expect(screen.getByText('Test 2 description')).toBeInTheDocument();
  });
});
