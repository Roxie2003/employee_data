import EnhancedTable from './components/EnhancedTable';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <Navbar />
      
      <div className='p-4 md:p-10'>
        <EnhancedTable />
      </div>
    </>
  );
}

export default App;
