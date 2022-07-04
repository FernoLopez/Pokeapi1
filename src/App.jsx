import { useState, useEffect } from 'react'
import './App.css'
import {NavLink, Route, Routes} from 'react-router-dom'
import Home from './Components/Home/Home'
import Pokedex from './Components/Pokedex/Pokedex'
/* import { useDispatch, useSelector } from 'react-redux' */
import CharactersCards from './Components/Pokedex/CharactersCards'
import Pagination from './Components/Pagination/Pagination'
import PokeInfo from './Components/Pokedex/PokeInfo'
import axios from 'axios'
import ProtectedRoutes from './Components/Router/ProtectedRoutes'
import Login from './Components/Login/Login'
import NavBar from './Components/Router/NavBar'

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [isLogged, setIsLogged] = useState(false) 

  useEffect(() => {
      setLoading(true);
    const URL=`https://pokeapi.co/api/v2/pokemon?limit=151`
    axios.get(URL)
    .then((response) =>{
        setPokemons(response.data.results)
    })
    .catch((error)=>{
        console.log(error)
    })
    .finally(() => setLoading(false));
   }, [])

   /* console.log(pokemons) */

const indexOfLastPokemon = currentPage * pokemonsPerPage;
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

const paginate = pageNumber => setCurrentPage(pageNumber);
  
return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/login' element={<Login setIsLogged={setIsLogged}/>}/>

        <Route element={<ProtectedRoutes isLogged={isLogged}/>}>
        <Route path='/' element={<Home />}/>
        
        <Route path='/pokedex' element={<Pokedex 
      pokemons={currentPokemons}
      loading={loading}
      /* setPokemons={setPokemons} *//>}>
        <Route index element={<Pagination 
         pokemonsPerPage={pokemonsPerPage}
         totalPokemons={pokemons.length}
         paginate={paginate}/>}/>
        </Route>
        <Route path='/pokedex/:id' element={<PokeInfo />}/> 
        </Route>
        </Routes>
      </div>
  )
}

export default App
