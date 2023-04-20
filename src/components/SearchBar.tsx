import React, { ChangeEvent } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Input
      placeholder='Search by title or description'
      prefix={<SearchOutlined />}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
