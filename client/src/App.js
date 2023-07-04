
import './App.css';
import {BrowserRouter} from "react-router-dom"
import ComedorApp from './components/ComedorApp/ComedorApp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ComedorApp/>
      </BrowserRouter>
    </div>
  );
}

export default App;
