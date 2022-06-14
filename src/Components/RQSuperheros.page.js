import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHerosData,
} from "../Hooks/useSuperHerosdata";
const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperherospage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccesshandler = (data) => {
    console.log("success", data);
  };
  const onErrorHandler = (error) => {
    console.log("failed", error);
  };

  //replacing with custom hook.
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHerosData(onSuccesshandler, onErrorHandler);

    //mutation function automatically receives argument you pass  when you invoke the mutate function is component.addHero is the mutatae function in our case.
  const { mutate:addHero,isLoading:loading,isError:Error,error:iserror } = useAddSuperHeroData(); //no need to pass parameters

  const handleAddHerosClick = () => {
      const hero={name,alterEgo}
      console.log(hero)
      addHero(hero)
  };

  //   const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
  //     "super-heroes",
  //     fetchSuperHeros,
  //     {
  //       //  cacheTime: 100000, //default value is 5 mins
  //       //staleTime: 30000, // default stale time is 0 sec.
  //       //  refetchOnMount: true, //true by default ,trigger table hoga jab data stab=le ho jaye , wese result aate hi data stale ho jata hai agar aapne stale time 0 sec rakha hai.
  //       // refetchOnMount:'always',//  chahe data stale ho ya fresh , onmount trigger hoga hi hoga.
  //       // refetchOnWindowFocus:true,  //jese hi backend api me data change ,front pr reflect kr jayega without refresh, UI is not in sync with remote data, when you browsertab looses focus and gains focus again te data refetched automatically.
  //       //refetchInterval: 2000, // polling, default value is false
  //       //note polling and automatic refetching is paused when window looses focus. yani aapne koi dusra tab open karliya hai
  //       //refetchIntervalInBackground:true,// poolling chalti rahegi agar aap tab switch bhi karte ho background me. default value is false
  //       enable: false, //fetch data on click not on onmount, inform  use query not to fire when component mounts
  //       onSuccess: onSuccesshandler,//react query automatically injects the data which is fetched  into  onSuccesshandler callback
  //       onError: onErrorHandler,//react query automatically injects the error which is fetched  into  onErrorHandler callback
  //      select:(data)=>{  // a function which automatically receives api data asa n argument
  //         const superHeroNames=data.data.map(hero=>hero.name)
  //         return superHeroNames
  //      }

  //      }
  //   )

  if (isLoading || isFetching) {
    return <div>loading</div>;
  }

  if (isError) {
    return (
      <>
        {" "}
        <h2>{error.message}</h2>
      </>
    );
  }

  return (
    <div>
      <h2>Super Heros page</h2>
      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data&&data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
      />
      <button onClick={handleAddHerosClick}>Add hero</button>
      <button onClick={refetch}> Fetch Heros</button>
    </div>
  );
};

export default RQSuperherospage;
