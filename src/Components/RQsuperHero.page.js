 import {useParams} from 'react-router-dom'
 import {useSuperHeroData} from '../Hooks/useSuperHerodata'
const RqsuperHeropage = () => {
    const {heroId:id}=useParams()
    const { isLoading, data, isError, error } =   useSuperHeroData(id)

    if (isLoading ) {
        return <div>loading</div>;
      }
    
    return (
        <div>
           {data?.data?.name} -{data.data.alterEgo}
        </div>
    )
}

export default RqsuperHeropage
