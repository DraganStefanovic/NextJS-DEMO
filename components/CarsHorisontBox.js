import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from "react-redux";
import { handlePopUpEditeDataState, handleOldEditeData} from '../store/carStore';
import { useRouter } from 'next/router';



function CarsHorisontBox(props) {   

  const whatIsEditeRow = useSelector((state) => state.carSlice.editeId);  




     
    const dispatch = useDispatch();  

    function popUpEditeData(e)  {
      dispatch(handlePopUpEditeDataState());   
      dispatch(handleOldEditeData(props));  

    } 

    const router = useRouter();

    const refreshData = () => {
      router.replace(router.asPath);     
    }
 

   const deliteData = async  (e, res) => {

        //const dataRowId = e.target.parentElement.parentElement.dataset.id;
        const dataRowId = e.target.parentElement.parentElement.parentElement.dataset.id;
        console.log(dataRowId);

        const response = await fetch('./api/editDBCar', {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },          
            //make sure to serialize your JSON body
            body: JSON.stringify({
              id: dataRowId,              
            })
          }) 
         
        const resposneStatus = await response

        if(resposneStatus.ok) {          
          refreshData();
        }     
          
  } 
    
    return(            
            <React.Fragment>
           
              
                <tr data-id={props.id} className= {props.id === whatIsEditeRow ? "Edite" : ""}  >
                                      
                   <Link href={{pathname:`/cars/${props.registration}`}} ><td className="CarsHorisontBoxTitle linkTitle">{props.title}</td></Link> 
                    <td className="CarsHorisontBoxReg">{props.registration}</td>  
                    <td className="CarsHorisontBoxReg">{props.tipKorisnika}</td>   
                    <td className="CarsHorisontBoxReg">{props.vehicleUser}</td>    
                    <td className="CarsHorisontBoxDate">{props.date}</td>  
                    <td className="CarsHorisontBoxDate">{props.voziloAktivnoOd}</td>  
                    <td className="CarsHorisontBoxDate text-center">x</td>  
                    <td className="action"><FontAwesomeIcon onClick={popUpEditeData} className='iconPen' icon={faPen} /><FontAwesomeIcon onClick={deliteData}  className='iconTrash' icon={faTrash} /></td>                              
                </tr>
               
            </React.Fragment>           
           

             
    )


}

export default CarsHorisontBox;