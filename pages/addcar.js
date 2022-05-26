import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import classes from '../styles/AuthForm.module.css';
import FileBase64 from 'react-file-base64';
import { useSelector, useDispatch } from "react-redux";
import { loginn, insertCarSignUpMsg} from '../store/carStore';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddCar() {
    

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    console.log(startDate +" X "+ endDate)



    const [item, setItem] = useState({title:'', image: '', regvalue:'', });
    const dispatch = useDispatch();

    const msguserLoginMsg = useSelector((state) => state.carSlice.CarSignUpMsg);      

    console.log(msguserLoginMsg)


    const onSubmitHadler = async (e) => {
        e.preventDefault();

        const response = await fetch('./api/addCarApi', {
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                'Content-Type' : 'application/json'
            }
        });      
        
        const responseData = await response.json(); 
        console.log(responseData.message) 

        dispatch(insertCarSignUpMsg(responseData.message));       
        
        


        
       
    }

    // useEffect(() => {
    //     const fetchData = async() => {
    //         const result = await getItems();

    //         console.log(result)

    //         setItems(result)
    //     }
    //     fetchData()
    // }, [])
    
    return(            
        <Layout>
            <h1 className={classes.pageTitle}>Add new Car</h1>        
            <section className={` ${classes.auth}  ${classes.addNewCar}`}> 
                <form onSubmit={onSubmitHadler}>
                    <div className={classes.control}>
                        <label>Marka i tip:<input type="text" onChange={e => setItem({...item, title: e.target.value})}/> </label>
                    </div>
                    <div className={classes.control}>
                        <label>Registracioni broj:<input type="text" onChange={e => setItem({...item, regvalue: e.target.value})}  /></label>
                    </div>
                    
                    <div className={ `radiobtn ${classes.control}`}> 
                    <p>Tip korisnika:</p>
                        <label>Zaposleni<input type="radio" id="zaposleni" name="zaposleni" value="zaposleni"/></label> 
                        <label>Druga lica<input type="radio" id="zaposleni" name="zaposleni" value="zaposleni"/></label>      
                    </div>
                    <div className={classes.control}>                   
                        <label>Add images                          
                                <FileBase64 multiple={ false } onDone={ ({base64}) => setItem({...item, image: base64}) } />    
                        </label>                
                    </div>
                    <div className={classes.control}>
                        <label>Isticianje registracije:<input type="date" onChange={e => setItem({...item, endreg: e.target.value})}  /></label>
                    </div>
                    <div className={classes.control}>
                        <label>Vozilo aktivno od do:                       
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate}/>
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />

                        </label>
                    </div>
                    <div className={classes.actions}>                
                        <button type='submit' >Add Car</button>
                    </div>
                    {msguserLoginMsg}
                </form>
            </section>   
        </Layout>        
    )
}

export default AddCar;