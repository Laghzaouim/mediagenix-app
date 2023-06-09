import DataType from '../../models/dataType';

const mockData: DataType[] = [
  {
    id: '1',
    title: 'Start of the year',
    type: 'generic',
    startDate: '2022-01-01',
    endDate: '2022-12-01',
    description: 'This is an event about the start of this year',
  },
  {
    id: '2',
    title: 'Mediagenix holiday',
    type: 'holiday',
    startDate: '2022-04-04',
    endDate: '2022-04-05',
    description: 'Celebrating Mediagenix',
  },
];

export default mockData;
