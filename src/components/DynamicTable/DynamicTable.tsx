import React, { useContext } from 'react';
import { Table, Spin } from 'antd';
import { useTableColumns } from '../../hooks/useTableColumns';
import schemaFields from '../../schemas/schemaFields';
import useFetchData from '../../api/useFetchData';
import AppContext from '../../context/AppContext';


export const DynamicTable: React.FC = () => {
  const columns = useTableColumns({ schema: schemaFields });
  const { searchText } = useContext(AppContext);
  const { data, isLoading } = useFetchData(searchText);

  return (
    <Spin spinning={isLoading}>
      <Table
        dataSource={data}
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
