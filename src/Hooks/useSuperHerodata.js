import { useQuery,useQueryClient } from "react-query";
import axios from "axios";
const fetchSuperHero = ({queryKey}) => {
    const id=queryKey[1]
    return axios.get(`http://localhost:4000/superheroes/${id}`);
  };
  
  //aap id as a parameter bhi pass kr skte ho in fetch SuperHero function.
  //but ye automatically react query pass krdeta hai aur use access krne ke liye react query  me array hota hai metadata ka uske index 1 id hoti hai jo dynamically aati hai.
  export const useSuperHeroData=(id)=>{
    const queryClient=  useQueryClient()
    return useQuery(
        ['super-hero',id],
         fetchSuperHero,{
             initialData:()=>{
                 const hero=queryClient.getQueryData('super-heroes')?.data?.find(hero=>hero.id===parseInt(id))
                 if(hero){
                     return{
                         data:hero
                     }
                 }
                 else{
                     return undefined
                 }
             }
         }
       )
 }
 
 //puana data agar aapko kahi aur kisi dusre component me dikhana ho

