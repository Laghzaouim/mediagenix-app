import { useContext } from 'react';
import { Button, Row, Col } from 'antd';
import SearchBar from '../SearchBar/SearchBar';
import AppContext from '../../context/AppContext';
import classes from './MainHeader.module.css';

export const MainHeader: React.FC = () => {
  const { handleSearch, toggleModal } = useContext(AppContext);

  return (
    <header className={classes.header}>
      <Row align='middle' justify='space-between'>
        <Col>
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col>
          <Button type='primary' onClick={toggleModal}>
            Create event
          </Button>
        </Col>
      </Row>
    </header>
  );
};
