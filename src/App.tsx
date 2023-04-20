import moment from 'moment';
import FormComponent from './components/Form';
import TableComponent from './components/Table';
import FormValues from './models/formValues';
import TableSchema from './models/tableSchema';
import schema from './schemas/formSchema';

const data: TableSchema[] = [
  {
    id: '1',
    title: 'Start of the year',
    type: 'generic',
    startDate: moment('2022-01-01', ' YYYY-MM-DD'), //format in YYYY-MM-DD
    endDate: moment('2022-12-01', ' YYYY-MM-DD'), //format in YYYY-MM-DD
    description: 'This is an event about the start of this year',
  },
  {
    id: '2',
    title: 'Mediagenix holiday',
    type: 'holiday',
    startDate: moment('2022-04-04', 'YYYY-MM-DD'), //format in YYYY-MM-DD
    endDate: moment('2022-04-05', 'YYYY-MM-DD'), //format in YYYY-MM-DD
    description: 'Celebrating Mediagenix',
  },
];

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
    <>
      <FormComponent
        onClose={closeHandler}
        onSubmit={submitHandler}
        formSchema={schema}
      />
      <TableComponent schema={schema} dataSource={data} />
    </>
  );
}

export default App;
