import { useQuery } from "react-query";
import axios from "axios";
const fetchSuperHero = ({queryKey}) => {
    const id=queryKey[1]
    return axios.get(`http://localhost:4000/superheroes/${id}`);
  };
  
  //aap id as a parameter bhi pass kr skte ho in fetch SuperHero function.
  //but ye automatically react query pass krdeta hai aur use access krne ke liye react query  me array hota hai metadata ka uske index 1 id hoti hai jo dynamically aati hai.
  export const useSuperHeroData=(id)=>{
    return useQuery(
        ['super-hero',id],
         fetchSuperHero,
       )
 }
 