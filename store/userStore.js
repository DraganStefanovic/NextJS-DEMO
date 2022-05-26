import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    value: 2, 
    loginPopUp:false,
    isAuthenticated: false,
    userLoginMsg: '',
    userSignUpMsg:'',
    userName:'',
    userSurname:'', 
}

export const userSlice = createSlice({
    name:'userStore',
    initialState,
    reducers: {        
          
        insertuserLoginMsg:(state, msg) => { 
           state.userLoginMsg = msg.payload;
        },
        insertuserSignUpMsg:(state, msg) => { 
            state.userSignUpMsg = msg.payload;
         },      
        login: (state) => {
            state.isAuthenticated = true;            
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userLoginMsg = "User LogOUT"
        },
        loginPopUpHandler: (state) => {
            state.loginPopUp = !state.loginPopUp;
            console.log("store " + state.loginPopUp)
        },
        userServerName: (state, res) => {
           
        },
        userServerSurname: (state, res) => {
            
        },
      },
   
})


export const { login, logout, loginPopUpHandler, insertuserLoginMsg, insertuserSignUpMsg, userServerData  } = userSlice.actions;
export default userSlice.reducer;


