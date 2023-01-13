import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import DogDetails from './Components/DogDetails/DogDetails';
import Form from './Components/Form/Form';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <LandingPage/>
          </Route>
          <Route exact path='/home'>
            <Home/>
          </Route>
          <Route exact path='/dog-detail/:id'>
            <DogDetails/>
          </Route>
          <Route exact path='/dog'>
            <Form/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
