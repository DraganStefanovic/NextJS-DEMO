import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    CarSignUpMsg:'', 
    currentUrlFd:'',
    insertCar: false,
    loadingDBCars:false,
    popUpEditeDataState:false,
    oldEditeData: {        
    },
    carDBdatafetch: {

    },
    savingdata: false,
    
   
   
}

export const carSlice = createSlice({
    name:'carStore',
    initialState,
    reducers: {       
        insertCarSignUpMsg:(state, msg) => { 
            state.CarSignUpMsg = msg.payload;            
         },     
         loadingDBCarsfn: (state) => {
            state.loadingDBCars = true;            
        },
        handlePopUpEditeDataState:(state) => {
            state.popUpEditeDataState = !state.popUpEditeDataState;
        },
        handleOldEditeData:(state, msg) => {
            state.oldEditeData = msg.payload;          

        },
         handleSavingData: (state) => {
            state.savingdata = true;            
        },
        handleSavingDataEnd: (state) => {
            state.savingdata = false;           
        },
        getUrlforFetchData:(state, msg) => {
            state.currentUrlFd = msg.payload;          

        },
      },
   
})


export const { insertCarSignUpMsg, getUrlforFetchData ,loadingDBCarsfn, handlePopUpEditeDataState, handleOldEditeData, handleSavingData, handleSavingDataEnd } = carSlice.actions;
export default carSlice.reducer;


