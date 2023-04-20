import FormComponent from './components/Form';
import TableComponent from './components/Table';
import DataType from './models/dataType';
import schema from './schemas/formSchema';
import useFetchData from './api/useFetchData';

function App() {
  const { data, isLoading, error } = useFetchData();

  const closeHandler = () => {
    console.log('FORM CLOSED!');
  };
  const submitHandler = (fromValues: DataType) => {
    console.log(
      '🚀 ~ file: App.tsx:10 ~ submitHandler ~ fromValues:',
      fromValues
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if(data?.length === 0) {
    return <div>Nothing data</div>;
  }

  return (
    <>
      <FormComponent
        onClose={closeHandler}
        onSubmit={submitHandler}
        formSchema={schema}
      />
      <TableComponent schema={schema} dataSource={data!} />
    </>
  );
}

export default App;
