import React from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import useFetchData from '../api/useFetchData';
import Schema from '../models/schema';
import { formatLabel } from '../utils/formatLabel';

interface Props {
  schema: Schema[];
}

const DynamicTable: React.FC<Props> = ({ schema }) => {
  // Fetch data using the custom data fetching hook
  const { data, isLoading, error } = useFetchData();

  // Generate table columns based on the provided schema
  const columns: ColumnType<any>[] = schema.flatMap((field) => {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Table dataSource={data} columns={columns} rowKey='id' />;
};

export default DynamicTable;
