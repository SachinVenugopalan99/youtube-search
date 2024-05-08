
import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';
import { dummyData } from './utils/constants';

function App() {
  return (
    <div className="App">
        <Autocomplete options={dummyData}/>
    </div>
  );
}

export default App;
