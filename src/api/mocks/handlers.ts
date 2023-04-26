import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import mockData from './mockData';
import { isNullOrUndefinedOrEmpty } from '../../utils/helpers';

export const handlers = [
  // Handler for GET requests to /api/data
  rest.get('/api/data', (req, res, ctx) => {
    // Extracting the value of the 'search' parameter from the request URL
    const search = req.url.searchParams.get('search');

    // Filtering the mock data based on the search query, if present
    const filteredData = !isNullOrUndefinedOrEmpty(search)
      ? mockData.filter(
          (item) =>
            item.title
              .toLowerCase()
              .includes(search?.toLowerCase() as string) ||
            item.description
              .toLowerCase()
              .includes(search?.toLowerCase() as string)
        )
      : mockData;

    // Returning the filtered data as a JSON response
    return res(ctx.json(filteredData));
  }),

  rest.post('/api/data', async (req, res, ctx) => {
    // Extracting the request body from the POST request
    const requestBody = await req.json();

    // Creating a new data object with a unique ID using the uuid library
    const newData = {
      id: uuidv4(),
      ...requestBody,
    };

    mockData.push(newData);

    // Returning a JSON response with the new data object and a 201 status code (created)
    return res(ctx.status(201), ctx.json(newData));
  }),
];
