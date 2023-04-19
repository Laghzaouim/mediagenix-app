import { Moment } from "moment";

export default interface FormValues {
  title: string;
  type: string;
  startDate: Moment;
  endDate: Moment;
  description: string;
}
