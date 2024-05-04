import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


const Results = ()=>{
const params=useParams()

useEffect(()=>{

    fetch("http://api.openweathermap.org/data/2.5/weather?q=${params.dinamicId},uk&APPID=5f2569959cfc9600ef45064ba9f8c714")


}


console.log("id:" ,params.dinamicId)
    return(
        <>
        
        
        
        
        </>
    )


}

export default Results