import './App.css';
import {Route,Switch} from "react-router-dom"
import Videogames from './components/Videogames/Videogames';
import DetailCard from './components/DetailCard/DetailCard';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import SearchBar from './components/SearchBar/SearchBar';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';
import {BrowserRouter} from "react-router-dom"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Switch>
      <Route exact path="/" component={LandingPage} />
    
      <Route exact path="/HOME" component={Videogames} />
      <Route exact path="/videogames/:videogameId" component={DetailCard} />
      <Route exact path="/videogame/create" component={CreateVideogame} />
      <Route  component={NotFound} />
      </Switch>
    </BrowserRouter>
    </div>

  );
}

export default App;
