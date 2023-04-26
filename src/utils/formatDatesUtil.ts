import { formatISO } from "date-fns";

export const formatDateToISO = (date: string): string => {
    return formatISO(new Date(date), { representation: 'date' });
  };
  