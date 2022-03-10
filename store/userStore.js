import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    value: 2, 
    loginPopUp:false,
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name:'counter',
    initialState,
    reducers: {
        increment:(state) => {
            state.value += 1;            
        },
        decrement:(state) => {
            state.value -=1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        login: (state) => {
            state.isAuthenticated = true;
            console.log(state.isAuthenticated + "Slice")
        },
        logout: (state) => {
        state.isAuthenticated = false;
        },
        loginPopUpHandler: (state) => {
            state.loginPopUp = !state.loginPopUp
        }
      },
   
})


export const {increment, decrement, incrementByAmount,login, logout, loginPopUpHandler  } = userSlice.actions;
export default userSlice.reducer;


