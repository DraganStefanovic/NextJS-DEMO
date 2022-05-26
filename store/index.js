import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userStore";
import carSlice from "./carStore";


export const store = configureStore({
    reducer: {
        userSlice: userSlice,  
        carSlice: carSlice, 
       
    },
});

export default store;




// /// LEKCIJA 252
