import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import DataType from '../../models/dataType';

const data: DataType[] = [
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

export const handlers = [
  rest.get('/api/data', (req, res, ctx) => {
    return res(ctx.json(data));
  }),

  rest.post('/api/data', async (req, res, ctx) => {
    const requestBody = await req.json();
    const newData = {
      id: uuidv4(),
      ...requestBody,
    };
    data.push(newData);
    return res(ctx.status(201), ctx.json(newData));
  }),
];
