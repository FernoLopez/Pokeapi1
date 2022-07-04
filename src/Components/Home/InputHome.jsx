import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { setNameGlobal } from '../../store/slices/user.slice'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
/* import image from '../Assets/userunknown.png' */

const InputHome = () => {

const {handleSubmit, reset, register}= useForm()

const dispatch = useDispatch()
const navigate = useNavigate()

const submit = data => {
    dispatch(setNameGlobal(data.infoUser))
    reset({infoUser: ''})
}
navigate('/pokedex')

  return (
    <div>
      <div>
      <h2 className='hi-trainer'>HI TRAINER!
      </h2>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <input className='form-box' placeholder='Enter your trainer name!' type="text" {...register('infoUser')}/>
        <button className='pokebutton-style float-button'><Icon className='icon-style' icon="mdi:pokeball" /></button>
      </form>
     {/*  <img className='user-style' src={image} alt='user_image'/>  */}
    </div>
  )
}

export default InputHome