import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import mockData from './mockData';
import { isNullOrUndefinedOrEmpty } from '../../utils/helpers';

export const handlers = [
  rest.get('/api/data', (req, res, ctx) => {
    const search = req.url.searchParams.get('search');
    const filteredData = !isNullOrUndefinedOrEmpty(search)
      ? mockData.filter(
          (item) =>
            item.title.toLowerCase().includes(search!.toLowerCase()) ||
            item.description.toLowerCase().includes(search!.toLowerCase())
        )
      : mockData;
    return res(ctx.json(filteredData));
  }),

  rest.post('/api/data', async (req, res, ctx) => {
    const requestBody = await req.json();
    const newData = {
      id: uuidv4(),
      ...requestBody,
    };
    mockData.push(newData);
    return res(ctx.status(201), ctx.json(newData));
  }),
];
