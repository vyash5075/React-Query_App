import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHeros=()=>{
    return axios.get('http://localhost:4000/superheros')

}
const fetchFriends=()=>{
    return axios.get('http://localhost:4000/friends')

}
 const Parallelqueries=()=>{

 const {data:superheros}=   useQuery('super-heros',fetchSuperHeros)
  const {data:friends}=  useQuery('friends',fetchFriends)
return<>parallelqueries</>
}

export default Parallelqueries