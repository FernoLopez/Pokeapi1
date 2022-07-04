import { configureStore } from "@reduxjs/toolkit";
import infoUser from './slices/user.slice'

export default configureStore({
    reducer: {
        infoUser
      }
  })