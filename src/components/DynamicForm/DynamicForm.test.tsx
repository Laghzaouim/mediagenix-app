import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DynamicForm } from './DynamicForm';
import { format, addDays } from 'date-fns';
import DataType from '../../models/dataType';
import AppContext, { AppContextProps } from '../../context/AppContext';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// Setting up mock functions and QueryClient instance for testing
const mockHandleFormSubmit = jest.fn();
const mockToggleModal = jest.fn();
const mockHandleSearch = jest.fn();
const queryClient = new QueryClient();

// Creating a wrapper component that provides necessary context and dependencies
const wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const contextValue: AppContextProps = {
    handleFormSubmit: mockHandleFormSubmit,
    isModalVisible: true,
    toggleModal: mockToggleModal,
    searchText: '',
    handleSearch: mockHandleSearch,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </QueryClientProvider>
  );
};

// Creating a mock date for testing
const mockDate = new Date('2023-03-26T00:00:00.000Z');

describe('DynamicTable', () => {
  test('fills in the fields and submits the form', async () => {
    render(<DynamicForm />, { wrapper });

    // Simulating user interaction with form fields
    fireEvent.input(screen.getByLabelText('Title'), {
      target: { value: 'New Event' },
    });

    fireEvent.mouseDown(screen.getByLabelText('Type'));
    fireEvent.click(screen.getByText('Holiday'));

    // Simulating user interaction with the RangePicker component
    const rangePicker = screen.getByLabelText('Date');
    fireEvent.mouseDown(rangePicker);

    const startDate = mockDate;
    const endDate = addDays(startDate, 1);

    const startDateElements = screen
      .getAllByText(startDate.getDate().toString())
      // eslint-disable-next-line testing-library/no-node-access
      .filter((element) => !element.closest('.ant-picker-cell-disabled'));
    fireEvent.click(startDateElements[0]);

    const endDateElements = screen
      .getAllByText(endDate.getDate().toString())
      // eslint-disable-next-line testing-library/no-node-access
      .filter((element) => !element.closest('.ant-picker-cell-disabled'));
    fireEvent.click(endDateElements[0]);

    fireEvent.input(screen.getByLabelText('Description'), {
      target: { value: 'New event description' },
    });

    fireEvent.click(screen.getByText('Submit'));

    // Checking if the form data is submitted correctly
    await waitFor(() => expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1));

    const expectedData: DataType = {
      title: 'New Event',
      type: 'holiday',
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      description: 'New event description',
    };
    expect(mockHandleFormSubmit).toHaveBeenCalledWith(expectedData);
  });

  test('displays validation errors if required fields are not filled', async () => {
    render(<DynamicForm />, { wrapper });

    // Simulating user clicking the submit button without filling in required fields
    fireEvent.click(screen.getByText('Submit'));

    // Checking if the validation errors are displayed
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(await screen.findByText('Type is required')).toBeInTheDocument();
    expect(await screen.findByText('Date is required')).toBeInTheDocument();
    expect(mockHandleFormSubmit).not.toHaveBeenCalled();
  });
});
