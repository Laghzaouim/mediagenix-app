import { useEffect, useState } from 'react';
import { ColumnType } from 'antd/lib/table';
import { formatLabel } from '../utils/formatLabel';
import SchemaField from '../models/schemaField';

interface UseTableColumnsProps {
  schema: SchemaField[];
}

export const useTableColumns = ({
  schema,
}: UseTableColumnsProps): ColumnType<any>[] => {
  const [columns, setColumns] = useState<ColumnType<any>[]>([]);

  useEffect(() => {
    const newColumns: ColumnType<any>[] = schema.flatMap((field) => {
      if (Array.isArray(field.name)) {
        return field.name.map((name, index) => ({
          title: field.name.length > 0 ? formatLabel(field.name[index]) : name,
          dataIndex: name,
          key: name,
        }));
      }

      return {
        title: field.label,
        dataIndex: field.name,
        key: field.name,
      };
    });

    setColumns(newColumns);
  }, [schema]);

  return columns;
};
