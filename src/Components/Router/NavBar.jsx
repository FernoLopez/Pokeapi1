import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
        <ul>
        <li><NavLink className={({isActive}) => isActive ? 'active link' : 'link'} 
          to='/login'>Login</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? 'active link' : 'link'} 
          to='/'>Home</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? 'active link' : 'link'} 
          to='/pokedex'>Go to pokedex</NavLink></li>
         <li><NavLink className={({isActive}) => isActive ? 'active link' : 'link'}
          to='/pokedex/:id'></NavLink></li> 
        </ul>
      </nav>
  )
}

export default NavBar