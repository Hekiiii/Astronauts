import logo from './logo.svg';
import './App.css';
import {Title} from './components/title';
import { AstronautsPage } from './components/astronauts';

function App() {
  return (
    <div className="App">
      <Title />
      <AstronautsPage />
    </div>
  );
}

export default App;
