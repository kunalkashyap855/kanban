import './App.css';

// components
import AddItem from './components/addItem';
import Header from './components/header';
import Board from './components/board';

function App() {
  return (
    <div className="App">
      <Header />
      <Board />
      {/* <AddItem /> */}
    </div>
  );
}

export default App;
