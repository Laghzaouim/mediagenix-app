import FormComponent from './components/Form';
import DynamicTable from './components/DynamicTable';
import DataType from './models/dataType';
import schema from './schemas/formSchema';

function App() {
  const closeHandler = () => {
    console.log('FORM CLOSED!');
  };
  const submitHandler = (fromValues: DataType) => {
    console.log(
      '🚀 ~ file: App.tsx:10 ~ submitHandler ~ fromValues:',
      fromValues
    );
  };

  return (
    <>
      <FormComponent
        onClose={closeHandler}
        onSubmit={submitHandler}
        formSchema={schema}
      />
      <DynamicTable schema={schema} />
    </>
  );
}

export default App;
