import React from 'react';
import { Table, Spin } from 'antd';
import DataType from '../models/dataType';
import SchemaField from '../models/schemaField';
import { useTableColumns } from '../hooks/useTableColumns';

interface Props {
  schema: SchemaField[];
  dataSource: DataType[];
  isLoading: boolean;
}

const DynamicTable: React.FC<Props> = ({ schema, dataSource, isLoading }) => {
  const columns = useTableColumns({ schema });

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
