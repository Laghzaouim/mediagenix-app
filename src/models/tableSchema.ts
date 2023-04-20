import { Moment } from 'moment';

export default interface TableSchema {
  id: string;
  title: string;
  type: string;
  startDate: Moment;
  endDate: Moment;
  description: string;
}
