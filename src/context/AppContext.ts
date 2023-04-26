import { createContext } from 'react';
import DataType from '../models/dataType';

export interface AppContextProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  searchText: string;
  handleSearch: (searchText: string) => void;
  handleFormSubmit: (values: DataType) => void;
}

const AppContext = createContext<AppContextProps>({
  isModalVisible: false,
  toggleModal: () => {},
  searchText: '',
  handleSearch: (searchText: string) => {},
  handleFormSubmit: (values: DataType) => {},
});

export default AppContext;
