import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userStore";



export const store = configureStore({
    reducer: {
        userSlice: userSlice,  
        // Dodati jos slice za automobile itd   
    },
});

export default store;




// /// LEKCIJA 252
