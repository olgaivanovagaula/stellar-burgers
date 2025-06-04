import { createSlice } from "@reduxjs/toolkit";

import { TUser } from "@utils-types";

import { logoutApi, 
  updateUserApi, 
  getUserApi,
  resetPasswordApi, 
  forgotPasswordApi, 
  loginUserApi, 
  registerUserApi } from "@api";



  const userApiSlice = createSlice({
    name: "user", 
    
  })

