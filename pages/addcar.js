import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import classes from '../styles/AuthForm.module.css';
import FileBase64 from 'react-file-base64';
import { useRouter } from "next/router";

function addCar() {
    
    const router = useRouter()
    const [item, setItem] = useState({title:'', image: '', regvalue:'', date:''});
    const [items, setItems] = useState([])

    const onSubmitHadler = async (e) => {
        e.preventDefault();

        const response = await fetch('./api/addCarApi', {
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                'Content-Type' : 'application/json'
            }
        });         
        
        router.push('/')
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
                        <label>Cars Makes:<input type="text" onChange={e => setItem({...item, title: e.target.value})}/> </label>
                    </div>
                    <div className={classes.control}>
                        <label>Car registration number:<input type="text" onChange={e => setItem({...item, regvalue: e.target.value})}  /></label>
                    </div>
                    <div className={classes.control}> 
                        <label>Registration Expiration <input type="date"  onChange={e => setItem({...item, date: e.target.value})} /></label>                
                    </div>
                    <div className={classes.control}>                   
                        <label>Add images                          
                                <FileBase64 multiple={ false } onDone={ ({base64}) => setItem({...item, image: base64}) } />    
                        </label>                
                    </div>
                    <div className={classes.actions}>                
                        <button type='submit' >Add Car</button>
                    </div>
                </form>
            </section>   
        </Layout>        
    )
}

export default addCar;