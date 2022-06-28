import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { handlePopUpEditeDataState, handlePopAddData} from '../store/carStore';
import { useRouter } from 'next/router';

function AddCarData(props) {    

    const dispatch = useDispatch();  
    const oldEditeData = useSelector((state) => state.carSlice.oldEditeData); 
    
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);     
      }

    const markaItip = useRef();
    const RegNumber = useRef();  
    const CarUser = useRef();  
    const RegDateEnd = useRef();
    const TipKorisnika = useRef();
    const VoziloAktivnoOd = useRef();

    const [isZaposlen, setisZaposlen] = useState(false);
    const [validMarkaItip, setisvalidMarkaItip] = useState(true);
    const [validRegNumber, setvalidRegNumber] = useState(true);

    console.log(isZaposlen + " isZaposlen")

    useEffect(() => {        
        if (TipKorisnika.current.value == "Zaposleni") {
            setisZaposlen(true);
            
        }

      }),[];

      function handlemarkaItip () {
          if(markaItip.current.value.length > 3) {
            setisvalidMarkaItip(true)
          }else {
            setisvalidMarkaItip(false)
          }        
          
      }     


    function alphanumeric() {

        const  inputtxt = RegNumber.current.value.trim();

        var validregformat = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
        var validregformat2 = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
        var validregformat3 = /^[A-Z]{2}[0-9]{5}[A-Z]{2}$/;        

        const trimvalidregformat = inputtxt.replace(/-/g, "")

            if(trimvalidregformat.match(validregformat) || trimvalidregformat.match(validregformat2) || trimvalidregformat.match(validregformat3) ) {               
                setvalidRegNumber(true);               
            }
            else {                 
                setvalidRegNumber(false)
            } 
    }

    function changeFuncTipKorisnika() {
        var selectBox = document.getElementById("TipKorisnika");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
            if (selectedValue == "Druga Lica") { 
                setisZaposlen(false);                
            }else if (selectedValue == "Zaposleni") { 
                setisZaposlen(true);                
            }
        }

    

    const saveData = async  (e) => {  

        if (validRegNumber) {
          
        const changedmarkaItip = markaItip.current.value;
        const changedRegNumber = RegNumber.current.value;
        const changedCarUser = CarUser.current.value;
        const changedRegDateEnd = RegDateEnd.current.value;
        const changedTipKorisnika = TipKorisnika.current.value;
        const changedVoziloAktivnoOd = VoziloAktivnoOd.current.value;
              

        const response = await fetch('./api/editDBCar', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            //make sure to serialize your JSON body
            body: JSON.stringify({                
                title: changedmarkaItip,
                registration:changedRegNumber,
                vehicleUser:changedCarUser,
                date:changedRegDateEnd, 
                tipKorisnika:changedTipKorisnika,  
                voziloAktivnoOd:changedVoziloAktivnoOd,
                gallery: [],       
          } )         

          })   
          
          const resposneStatus = await response

          if(resposneStatus.ok) {
            dispatch(handlePopAddData()),
            console.log("aDD CARS")
            refreshData();
          }  
        }
      
  }
     
  function PopUpAddCarFn(e)  {
    dispatch(handlePopAddData());
  } 
      

    return(
        <Fragment>  
            <div className='bgPopUp'>
            <div className='editRow standard-wrap'>
                <div className='closeBtn'><FontAwesomeIcon onClick={PopUpAddCarFn} icon={faXmark} /></div>
                <form>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div>
                                <label htmlFor='name'>Marka i tip:</label>
                                <input onBlur={handlemarkaItip} type='text' id='name'  required ref={markaItip} />
                                {!validMarkaItip && <p className='alert error'>Marka i tip vozila moraju da budu duzi od 4</p>}
                            </div>
                            <div>
                                <label htmlFor='name'>Registracioni Broj:</label>
                                <input type="name" id='RegNumber' onBlur={alphanumeric}  required ref={RegNumber} />
                                {!validRegNumber && <p className='alert error'>Registracioni broj mora da bude u formatu SS-BBB(BB)-SS</p>}
                            </div>
                            <div>
                                <label htmlFor='name'>Tip Korisnika:</label>
                                <select onChange={changeFuncTipKorisnika}  defaultValue={'DEFAULT'} required ref={TipKorisnika} name="TipKorisnika" id="TipKorisnika">
                                    <option value="DEFAULT" disabled hidden>Choose here</option>
                                    <option value="Zaposleni">Zaposleni</option>
                                    <option value="Druga Lica">Druga Lica</option>                                    
                                </select>                                
                            </div>
                            {!isZaposlen && 
                            <div>
                                <label htmlFor='name'>Korisnik vozila:</label>
                                <input id="customVehicleUser" type='text'  required ref={CarUser} />
                            </div> }

                            {isZaposlen && 
                            <div>
                                <label htmlFor='name'>Korisnik vozila:</label>
                                <select type='text' id='CarUser' required ref={CarUser} >
                                <option value="Tanja Milinkovic">Tanja Milinkovic</option>    
                                <option value="Marko Jovanovic">Marko Jovanovic</option>  
                                <option value="Srdjan Tomic">Srdjan Tomic</option>   
                                <option value="Ivan Rajkovic">Ivan Rajkovic</option>   
                                <option value="Darko Jolic">Darko Jolic</option>   
                                <option value="Aca, Una">Aca, Una</option>                     
                                </select>    
                            </div> 
                            }                           
                            
                        </div>
                        <div className='col-md-6'>
                            <div >
                                <label htmlFor='date'>Isticanje registracije:</label>
                                <input type='date' id='RegDateEnd'  required ref={RegDateEnd} />
                            </div>    
                            <div >
                                <label htmlFor='date'>Vozilo aktivno od:</label>
                                <input type='date' id='voziloAktivnoOd' required ref={VoziloAktivnoOd} />
                            </div>                          
                            
                        </div>
                        <button type='button'  onClick={saveData}  >Save</button>
                    </div>                    
                </form>
               
            </div>
            </div>
                  
        </Fragment>
        
    )
}

export default AddCarData;