import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DynamicTable } from './DynamicTable';
import AppContext, { AppContextProps } from '../../context/AppContext';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useFetchData from '../../api/useFetchData';
import DataType from '../../models/dataType';

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

jest.mock('../../api/useFetchData');

const mockHandleFormSubmit = jest.fn();
const mockToggleModal = jest.fn();
const mockHandleSearch = jest.fn();

const queryClient = new QueryClient();

const wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const contextValue: AppContextProps = {
    isModalVisible: false,
    toggleModal: mockToggleModal,
    searchText: '',
    handleSearch: mockHandleSearch,
    handleFormSubmit: mockHandleFormSubmit,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </QueryClientProvider>
  );
};

describe('DynamicTable', () => {
  test('renders table with correct headers on load', async () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<DynamicTable />, { wrapper });

    expect(await screen.findByText('Title')).toBeInTheDocument();
    expect(await screen.findByText('Type')).toBeInTheDocument();
    expect(await screen.findByText('Start Date')).toBeInTheDocument();
    expect(await screen.findByText('End Date')).toBeInTheDocument();
    expect(await screen.findByText('Description')).toBeInTheDocument();
  });

  test('table is filled in with the correct data', async () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: dataSource,
      isLoading: false,
    });

    render(<DynamicTable />, { wrapper });

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
