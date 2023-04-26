import { useEffect, useState } from 'react';
import { ColumnType } from 'antd/lib/table';
import { formatLabel } from '../utils/formatLabelUtil';
import SchemaField from '../models/schemaField';

// Defining a custom hook to create table columns from a schema
interface UseTableColumnsProps {
  schema: SchemaField[];
}

export const useTableColumns = ({
  schema,
}: UseTableColumnsProps): ColumnType<any>[] => {
  // Setting up state for the table columns
  const [columns, setColumns] = useState<ColumnType<any>[]>([]);

  // Using useEffect to create the table columns when the schema changes
  useEffect(() => {
    const newColumns: ColumnType<any>[] = schema.flatMap((field) => {
      if (Array.isArray(field.name)) {
        // If the field name is an array, map over it and create a column for each name
        return field.name.map((name, index) => ({
          title: field.name.length > 0 ? formatLabel(field.name[index]) : name,
          dataIndex: name,
          key: name,
        }));
      }

      // If the field name is not an array, create a single column
      return {
        title: field.label,
        dataIndex: field.name,
        key: field.name,
      };
    });

    // Update the state with the new columns
    setColumns(newColumns);
  }, [schema]);

  return columns;
};
