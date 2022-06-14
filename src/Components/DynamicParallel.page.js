import axios from "axios";
import { useQueries, useQueryClient } from "react-query";



const fetchSuperHero=(heroId)=>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}
const Dynamicparallepage=({heroIds})=>{

//     //useQueries will return an arry of query results.
   const queryResults= useQueries(heroIds.map(id=>{
        return {
            queryKey:['super-hero',id],
            queryFn:()=>fetchSuperHero(id)
        }
    })
   )



    return <div>Dynamic parallel queries</div>
}

export default Dynamicparallepage