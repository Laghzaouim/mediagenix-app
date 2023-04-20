import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import TableSchema from '../models/tableSchema';
import { ColumnsType } from 'antd/es/table';
import FormSchema from '../models/formSchema';

interface TableComponentProps {
  dataSource: TableSchema[];
  schema: FormSchema[];
}

const TableComponent: React.FC<TableComponentProps> = React.memo(
  ({ dataSource, schema }) => {
    const columns: ColumnsType<TableSchema> = schema.flatMap(
      ({ label, name }) => {
        if (label === 'Date' && Array.isArray(name)) {
          // If this is a "Date" column with a name array, create two columns for the start and end dates
          return [
            {
              title: 'Start Date',
              dataIndex: name[0],
              key: `${name[0]}-column`,
              render: (text: string) =>
                moment(text).format('YYYY-MM-DD'),
            },
            {
              title: 'End Date',
              dataIndex: name[1],
              key: `${name[1]}-column`,
              render: (text: string) =>
                moment(text).format('YYYY-MM-DD'),
            },
          ];
        } else {
          // For all other columns, create a single column
          const column = {
            title: label,
            dataIndex: name,
            key: `${name}-column`,
            render: (text: string) => text,
          };

          return [column];
        }
      }
    );

    return <Table columns={columns} dataSource={dataSource} rowKey='id' />;
  }
);

export default TableComponent;
