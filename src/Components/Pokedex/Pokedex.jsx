import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import CharactersCards from './CharactersCards'
import Form from '../Filter/Form'
import { Outlet } from 'react-router-dom'
import Pagination from '../Pagination/Pagination'

const Pokedex = () => {

  const infoUser = useSelector(state => state.infoUser)

  const [characters, setCharacters] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [filterPokemon, setFilterPokemon] = useState()
  const [typeList, setTypeList] = useState() 
  const [filterType, setFilterType] = useState('All Pokemons')
  const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
      if(filterType === 'All Pokemons'){
        const URL='https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151/'
        axios.get(URL)
        .then((res) =>{
          console.log(res.data.results)
            setCharacters(res.data.results)
        })
        .catch((error)=>{
            console.log(error)})
     } else if (!pokeSearch){
      const URL = `https://pokeapi.co/api/v2/type/${filterType}/`
      axios.get(URL)
      .then(res => {
        console.log(res.data.pokemon)
        const array = res.data.pokemon.map(e => e.pokemon)
        setCharacters(array)
      })
      .catch(error => console.log(error))
    } else {
      const URL = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}/`
      axios.get(URL)
      axios.get(URL)
        .then((res) =>{
          console.log(res.data.results)
            setCharacters(res.data.results)
        })
        .catch((error)=>{
            console.log(error)})
    }
  }, [filterType, pokeSearch])

  useEffect (() => {
    const URL='https://pokeapi.co/api/v2/type/'
    axios.get(URL)
    .then((res) =>{
      setTypeList(res.data.results)
  })
  .catch((error)=>{
      console.log(error)
  })
}, [])
    
    useEffect (()=> {
      setFilterPokemon(arrayPokemons?.filter(e => e.name.includes(pokeSearch.toLowerCase()))
    )
  }, [pokeSearch])

  /*  if (loading) {
    return <h2>Loading...</h2>;
  }  */

  let arrayPokemons = []
  const pokemonsPerPage = 6
  if(characters?.length < pokemonsPerPage){
    arrayPokemons = [...characters]
  } else {
    const lastPokemon = currentPage * pokemonsPerPage
    arrayPokemons = characters?.slice(lastPokemon - pokemonsPerPage, lastPokemon)
  }

  let arrayPages = []
  let quantityPages = Math.ceil(characters?.length / pokemonsPerPage)
  const pagesPerBlock = 5
  let currentBlock = Math.ceil(currentPage / pagesPerBlock)
  if(currentBlock * pagesPerBlock >= quantityPages){
    for(let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= quantityPages; i++){
      arrayPages.push(i)
    }
  } else {
    for(let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= currentBlock * pagesPerBlock; i++){
      arrayPages.push(i)
    }
  }
  /* console.log(arrayPages) */

  return (
    <article>
      <h2>Hi {infoUser}, welcome to pokedex! </h2>
      <Outlet />
      <Pagination 
      arrayPages={arrayPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      quantityPages={quantityPages}
      />
      <Form setPokeSearch={setPokeSearch}
       typeList={typeList} 
       setFilterType={setFilterType}
       />
      {
        filterPokemon ?
        filterPokemon?.map(pokemon => (
          <CharactersCards 
            key={pokemon.url}
            url={pokemon.url}
          />
        ))
      :
      arrayPokemons?.map(pokemon => (
        <CharactersCards 
          key={pokemon.url}
          url={pokemon.url}
        />
      ))
}
    </article>
  )
}

export default Pokedex