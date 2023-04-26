import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DynamicForm from './DynamicForm';
import { format, addDays } from 'date-fns';
import schemaFields from '../schemas/schemaFields';
import DataType from '../models/dataType';

describe('DynamicTable', () => {
  test('fills in the fields and submits the form', async () => {
    const onSubmit = jest.fn();
    render(<DynamicForm schema={schemaFields} onSubmit={onSubmit} />);

    fireEvent.input(screen.getByLabelText('Title'), {
      target: { value: 'New Event' },
    });

    fireEvent.mouseDown(screen.getByLabelText('Type'));
    fireEvent.click(screen.getByText('Holiday'));

    // Simulate user interaction with the RangePicker component
    const rangePicker = screen.getByLabelText('Date');
    fireEvent.mouseDown(rangePicker);

    const startDate = new Date();
    const endDate = addDays(startDate, 1)

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

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

    const expectedData: DataType = {
      title: 'New Event',
      type: 'holiday',
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      description: 'New event description',
    };
    expect(onSubmit).toHaveBeenCalledWith(expectedData);
  });

  test('displays validation errors if required fields are not filled', async () => {
    const onSubmit = jest.fn();
    render(<DynamicForm schema={schemaFields} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(await screen.findByText('Type is required')).toBeInTheDocument();
    expect(await screen.findByText('Date is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
