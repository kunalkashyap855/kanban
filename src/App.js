import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// components
// import AddItem from './components/addItem';
// import Header from './components/header';
// import Board from './components/board';

import Home from './components/Home';
import Signin from './components/userSignin';
import Signup from './components/userSignup'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Board /> */}
      {/* <AddItem /> */}
      <Router>
        <Switch>
        <Route exact path="/" component={Home}/>
       
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/signup" component={Signup}/>
       
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
