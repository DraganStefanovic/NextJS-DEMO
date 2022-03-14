import React from 'react';


function CarsHorisontBox(props) {   

    console.log(props )

    
    return(            
            <React.Fragment>
                <div className='CarsHorisontBox'>
                    <div className="CarsHorisontBoxImage"><img src={props.image}></img></div>
                    <div className="CarsHorisontBoxTitle"><h3>Title: {props.title}</h3></div>
                    <div className="CarsHorisontBoxReg"><h3>Registration number: {props.registration}</h3></div>        
                    <div className="CarsHorisontBoxDate"><h3>Registration Date End: {props.date}</h3></div>                              
                </div>
            </React.Fragment>
            
           

             
    )


}

export default CarsHorisontBox;