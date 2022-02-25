import React, { useEffect } from 'react';
import axios from 'axios';


function FoodInFo({  }) {
    useEffect(()=>{
        axios.get('/api/hello')
        .then(res=>(
            console.log(res,"food")
        ));
    }, []);
   
  
    return (
    <div>
      foodinfoss
    </div>
  )
}

export default FoodInFo;

