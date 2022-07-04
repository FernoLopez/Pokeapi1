import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from '../Assets/pokemon-poke-balls-artwork-wallpaper-preview.jpg'

const Login = ({setIsLogged}) => {

    const navigate = useNavigate()

    const clickLogged = () => {
    setIsLogged(true) 
    navigate('/')
    }
  return (
    <article>
        <h2>Login</h2>
        <img className='user-style' src={image} alt='user_image'/>
        <button onClick={clickLogged}>Catch'em Pokemons!</button>
    </article>
  )
}

export default Login