import React from 'react';
import { Table, Spin } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { formatLabel } from '../utils/formatLabel';
import DataType from '../models/dataType';
import SchemaField from '../models/schemaField';

interface Props {
  schema: SchemaField[];
  dataSource: DataType[];
  isLoading: boolean;
}

const DynamicTable: React.FC<Props> = ({ schema, dataSource, isLoading }) => {
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

  return (
    <Spin spinning={isLoading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey='id'
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
      />
    </Spin>
  );
};

export default DynamicTable;
