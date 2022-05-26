import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from "react-redux";
import { handlePopUpEditeDataState, handleOldEditeData} from '../store/carStore';




function CarsHorisontBox(props) {   

   const popUpEditeDataState = useSelector((state) => state.carSlice.popUpEditeDataState);  

    const dispatch = useDispatch();  

    function popUpEditeData(e)  {
      dispatch(handlePopUpEditeDataState());   
      dispatch(handleOldEditeData(props));  

    } 
 

   const editdata = async  (e) => {  

        const dataRowId = e.target.parentElement.parentElement.dataset.id;

        console.log(dataRowId);

        const response = await fetch('./api/editDBCar', {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            //make sure to serialize your JSON body
            body: JSON.stringify({
              name: dataRowId,
              
            })
          });      
  
        const responseData = await response.json(); 
        console.log(responseData) 
  }


  
    
    return(            
            <React.Fragment>
                <tr data-id={props.id}>                    
                   <Link href={{pathname:`/cars/${props.registration}`}} ><td className="CarsHorisontBoxTitle linkTitle">{props.title}</td></Link> 
                    <td className="CarsHorisontBoxReg">{props.registration}</td>  
                    <td className="CarsHorisontBoxReg">{props.tipKorisnika}</td>   
                    <td className="CarsHorisontBoxReg">{props.vehicleUser}</td>    
                    <td className="CarsHorisontBoxDate">{props.date}</td>  
                    <td className="CarsHorisontBoxDate">{props.voziloAktivnoOd}</td>  
                    <td className="CarsHorisontBoxDate text-center">x</td>  
                    <td className="action"><FontAwesomeIcon onClick={popUpEditeData} className='iconPen' icon={faPen} /><FontAwesomeIcon  className='iconTrash' icon={faTrash} /></td>                              
                </tr>
               
            </React.Fragment>           
           

             
    )


}

export default CarsHorisontBox;