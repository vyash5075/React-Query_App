import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import {useState} from 'react'
const fetchColors=(pageno)=>{
return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageno}`)
}

 //display onl 2 colors per page
const Paginatedqueries=({email})=>{
    const[pageNumber,setPageNumber]=useState(1)
   const {isLoading,isError,error,data}= useQuery(['colors',pageNumber],()=>fetchColors(pageNumber),{
       keepPreviousData:true,
   })
 
   if(isLoading){
       return <h2>Loading...</h2>
   }
   if(isError){
       return <h2>{error.message}</h2>
   }
    return <div>
        <>
        {data?.data.map(color=>{
            return(
                <div key={color.id}>
                    <h2>{color.id}- {color.label}</h2>
                    </div>
            )
        })}
        </>
        <button onClick={(()=>setPageNumber(page=>page-1))} disabled={pageNumber===1}>prev</button>
        <button onClick={(()=>setPageNumber(page=>page+1))} disabled={pageNumber===4}>next</button>
        
         </div>
}

export default Paginatedqueries