import React from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import SchemaField from '../models/SchemaField';
import { formatLabel } from '../utils/formatLabel';
import DataType from '../models/dataType';

interface Props {
  schema: SchemaField[];
  dataSource: DataType[];
}

const DynamicTable: React.FC<Props> = ({ schema, dataSource }) => {
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

  return <Table dataSource={dataSource} columns={columns} rowKey='id' />;
};

export default DynamicTable;
