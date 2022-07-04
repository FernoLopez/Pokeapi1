import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import CharactersCards from './CharactersCards'
import Form from '../Filter/Form'
import { Outlet } from 'react-router-dom'

const Pokedex = ({pokemons, loading}) => {

  const infoUser = useSelector(state => state.infoUser)

  const [characters, setCharacters] = useState()
  const [pokeSearh, setPokeSearch] = useState()
  const [filterPokemon, setFilterPokemon] = useState()
  const [typeList, setTypeList] = useState()
  const [filterType, setFilterType] = useState('All Pokemons')

    useEffect(() => {
      if(filterType === 'All Pokemons'){
        const URL='https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'
        axios.get(URL)
        .then((response) =>{
            setCharacters(response.data.results)
        })
        .catch((error)=>{
            console.log(error)})
     } else {
      const URL = `https://pokeapi.co/api/v2/type/${filterType}/`
      axios.get(URL)
      .then(res => {
        const array = res.data.pokemon.map(e => e.pokemon)
        setCharacters(array)
      })
      .catch(error => console.log(error))
    }
  }, [filterType])

  useEffect (() => {
    const URL='https://pokeapi.co/api/v2/type'
    axios.get(URL)
    .then((response) =>{
      setTypeList(response.data.results)
  })
  .catch((error)=>{
      console.log(error)
   /*  if(characters){
    setFilterPokemon(characters.filter(e => e.name.includes(pokeSearh.toLowerCase())) */
  })
}, [pokeSearh])
    
    useEffect (()=> {
      if(characters){
      setFilterPokemon(characters.filter(e => e.name.includes(pokeSearh.toLowerCase()))
    )}
  }, [pokeSearh])

   if (loading) {
    return <h2>Loading...</h2>;
  } 
  
  return (
    <article>
      <h2>Hi {infoUser}, welcome to pokedex! </h2>
      <Outlet />
      <Form setPokeSearch={setPokeSearch}
       typeList={typeList}
       setFilterType={setFilterType}/>
      {
        filterPokemon ?
        filterPokemon?.map(pokemon => (
          <CharactersCards 
            key={pokemon.url}
            url={pokemon.url}
          />
        ))
      :
      pokemons?.map(pokemon => (
        <CharactersCards 
          key={pokemon.url}
          url={pokemon.url}
        />
      ))
     /*  }
      {
      pokemons?.map(pokemon => (
        <CharactersCards
        key={pokemon.url}
        url={pokemon.url}
        />
      )) */
}
    </article>
  )
}

export default Pokedex