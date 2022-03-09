import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    value: 2, 
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
      },
   
})


export const {increment, decrement, incrementByAmount,login, logout  } = userSlice.actions;
export default userSlice.reducer;


