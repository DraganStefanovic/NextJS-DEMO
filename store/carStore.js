import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    CarSignUpMsg:'', 
    currentUrlFd:'',
    insertCar: false,
    loadingDBCars:false,
    popUpEditeDataState:false,          
    editeId:"",    
    oldEditeData: {        
    },
    carDBdatafetch: {

    },
    savingdata: false,
    popAddData: false,
    
   
   
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
        getUrlforFetchData:(state, msg) => {
            state.currentUrlFd = msg.payload;          

        },
         handlePopAddData:(state) => {
            state.popAddData = !state.popAddData             

        }, handleWhatIsEdite:(state, msg) => {            
            state.editeId = msg.payload
            localStorage.setItem("EditeRows", msg.payload)
            console.log(state.editeId)
            

        },
      },
   
})


export const { insertCarSignUpMsg, handleWhatIsEdite, getUrlforFetchData ,loadingDBCarsfn, handlePopUpEditeDataState, handlePopAddData, handleOldEditeData, handleSavingData, } = carSlice.actions;
export default carSlice.reducer;


