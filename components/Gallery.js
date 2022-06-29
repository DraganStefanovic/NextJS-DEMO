import React, { Fragment, useState } from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from "react-redux";
import FileBase64 from 'react-file-base64';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { getUrlforFetchData } from '/store/carStore';

function Gallery(props) {   

    const dispatch = useDispatch();

    const router = useRouter();
    const currentUrl = router.query.carId;   

    const refreshData = () => {
      router.replace(router.asPath);     
    } 

    dispatch(getUrlforFetchData(`${currentUrl}`));   
    
    const [image, setImage] = useState({ imageSrc: '' });  
    let modifiedArr = []
    
    console.log(props.props)

    if(props.props.length > 0) {
        modifiedArr = props.props.map((imgSrcO) => (
           {
           original: imgSrcO.imgSrc.imageSrc,
           thumbnail: imgSrcO.imgSrc.imageSrc,
           }           
         ))       
         
   }else {
        modifiedArr =   [ {
           original: 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg',
           thumbnail: 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg',
       }]      
   } 

   async function addimage () {

    const data = {
        currentUrl,
        image
    }

    console.log(data)

    if(image.imageSrc !== null && image.imageSrc !== '') {            
        const response = await fetch('/api/editCarProfil', {
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type' : 'application/json'
            }
        });

        
        const resposneStatus = await response

        if(resposneStatus.ok) {          
          refreshData();
        }   
    }

      
   
   

}  




    return(
        <React.Fragment>
              <div className='col-md-6'>                   
                     <ImageGallery items={modifiedArr} />                    
                    <div className='uploadImg'>  
                        <label>                        
                                <FileBase64 multiple={ false } onDone={ ({base64}) => setImage({...image, imageSrc: base64}) } />    
                        </label>   
                        <p className='btn' onClick={addimage}>Upload Image</p>             
                    </div> 
                </div>
        </React.Fragment>
        
    )
}

export default Gallery;