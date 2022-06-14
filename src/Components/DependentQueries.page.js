import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchUserByEmail=(email)=>{
return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesbychannelId=(channelId)=>{
    return axios.get(`http://localhost:4000/channels/${channelId}`)
    }

const Dependentqueries=({email})=>{
   const {data:user}= useQuery(['user',email],()=>fetchUserByEmail(email))


   const channelId=user?.data.channelId


   useQuery(['courses',channelId],()=>fetchCoursesbychannelId(channelId),{enabled:!!channelId})
    return <div>Dependent queries</div>
}

export default Dependentqueries