import './App.css';
import {Route} from "react-router-dom"
import Home from "./components/Home"
import Videogames from './components/Videogames/Videogames';
import DetailCard from './components/DetailCard/DetailCard';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';

function App() {
  return (
    <div className="App">
     <Route exact path={"/HOME"} component={Videogames} />
     <Route exact path={"/videogames/:videogameId"} component={DetailCard} />
     <Route exact path={"/videogame/create"} component={CreateVideogame} />
    </div>
  );
}

export default App;
