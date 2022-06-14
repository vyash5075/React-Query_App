import { useQuery,useMutation,useQueryClient } from "react-query";
// import axios from "axios";
import { request } from "../utils/axios-utils";
const fetchSuperHeros = () => {
    // return axios.get("http://localhost:4000/superheroes");
    return request({url:'/superheroes'})
  };
  
export const useSuperHerosData=(onSuccesshandler,onErrorHandler)=>{
   return useQuery(
        "super-heroes",
        fetchSuperHeros,
        {
          //  cacheTime: 100000, //default value is 5 mins
          //staleTime: 30000, // default stale time is 0 sec.
          //  refetchOnMount: true, //true by default ,trigger table hoga jab data stab=le ho jaye , wese result aate hi data stale ho jata hai agar aapne stale time 0 sec rakha hai.
          // refetchOnMount:'always',//  chahe data stale ho ya fresh , onmount trigger hoga hi hoga.
          // refetchOnWindowFocus:true,  //jese hi backend api me data change ,front pr reflect kr jayega without refresh, UI is not in sync with remote data, when you browsertab looses focus and gains focus again te data refetched automatically.
          //refetchInterval: 2000, // polling, default value is false
          //note polling and automatic refetching is paused when window looses focus. yani aapne koi dusra tab open karliya hai
          //refetchIntervalInBackground:true,// poolling chalti rahegi agar aap tab switch bhi karte ho background me. default value is false
          enable: false, //fetch data on click not on onmount, inform  use query not to fire when component mounts
          onSuccess: onSuccesshandler,//react query automatically injects the data which is fetched  into  onSuccesshandler callback
          onError: onErrorHandler,//react query automatically injects the error which is fetched  into  onErrorHandler callback
        //  select:(data)=>{  // a function which automatically receives api data asa n argument
        //     const superHeroNames=data.data.map(hero=>hero.name)
        //     return superHeroNames
        //  }
         
         }
      )
}

const addSuperHero=(hero)=>{
// return axios.post('http://localhost:4000/superheroes',hero)
return request({url:'/superheroes',method:'post',data:hero})
}
// export const useAddSuperHeroData=()=>{
//     const queryClient=useQueryClient()
//     return useMutation(addSuperHero,{
//         onSuccess:(data)=>{
//          //   queryClient.invalidateQueries('super-heroes')
//          queryClient.setQueryData('super-heroes',(oldquerydata)=>{
//              return {
//                  ...oldquerydata,
//                  data:[...oldquerydata.data,data.data],
//              }
//          }) // this functon automatically receives oldquerydata as an argument
//         }
//     })
// }

//_________________________________________________________________________________________

//optimistic update or optimized way

//onMutate function :=
//is called before the mutation function is fired and is passed the same variables the mutation function would receive
//within the onMutate function the first hig you do is to  cancel the an outgoing refetches,so they dont override our optimistic updates.
//we need to get hold the current query data before we make any update this will help us in rollback in case mutation fails.



//onError:=
// this function is called when mutation encounters an error
export const useAddSuperHeroData=()=>{
    const queryClient=useQueryClient()
    return useMutation(addSuperHero,{
        onMutate: async newHero => {
            await queryClient.cancelQueries('super-heroes')
            const previousHeroData = queryClient.getQueryData('super-heroes')
            queryClient.setQueryData('super-heroes', oldQueryData => {
              return {
                ...oldQueryData,
                data: [
                  ...oldQueryData.data,
                  { id: oldQueryData?.data?.length + 1, ...newHero }
                ]
              }
            })
            return { previousHeroData }
          },
          onError: (_err, _newTodo, context) => {  // underscore laga do jo variable use nai ho raha
            queryClient.setQueryData('super-heroes', context.previousHeroData)
          },
          onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
          }
          /**Optimistic Update End */

    })
}




