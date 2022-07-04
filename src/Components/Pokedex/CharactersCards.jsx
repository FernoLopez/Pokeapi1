import React from 'react'
/* import { useSelector } from 'react-redux' */
/* import InputHome from './InputHome' */
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CharactersCards = ({url}) => {

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate()

  const clickCard = () => navigate(`/pokedex/${pokemon.id}`)

    console.log(pokemon)  

  return (
    <article onClick={clickCard} className='card-pokemon'>
      <img src={pokemon?.sprites['front_default']} alt="" />
      <img src={pokemon?.sprites['back_default']} alt="" />
      <p>{pokemon?.name}</p>
      <p><b>Type: </b>{pokemon?.types[0].type.name}</p>
    </article>
  )
}

export default CharactersCards