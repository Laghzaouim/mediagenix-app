import FormComponent from './components/Form';
import FormValues from './models/formValues';
import schema from './schemas/formSchema';

function App() {
  const closeHandler = () => {
    console.log('FORM CLOSED!');
  };
  const submitHandler = (fromValues: FormValues) => {
    console.log(
      '🚀 ~ file: App.tsx:10 ~ submitHandler ~ fromValues:',
      fromValues
    );
  };

  return (
    <div>
      <FormComponent
        onClose={closeHandler}
        onSubmit={submitHandler}
        formSchema={schema}
      />
    </div>
  );
}

export default App;
