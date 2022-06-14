import "./App.css"; 

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/Home.Page";
import RQSuperHeroesPage from "./Components/RQSuperheros.page";
import SuperHeroesPage from "./Components/SuperHeros.Page";
import HeroDetails from './Components/RQsuperHero.page'
import Parallelqueries from './Components/ParallelQueries.page'
import DynamicParallel from './Components/DynamicParallel.page'
import Dependentquery from './Components/DependentQueries.page'
import Paginated from './Components/PaginatedQueries.page'
import {QueryClientProvider,QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
const queryClient=new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
      <Routes>
        <Route path='/rq-dynamic-parallel' element={<DynamicParallel heroIds={[1,3]}/>}/>
        <Route exact path="/rq-dependent" element={<Dependentquery email='vishwas@example.com' />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/rq-paginated" element={<Paginated />} />
        <Route exact path="/rq-parallel" element={<Parallelqueries />} />
        <Route exact path="/super-heroes" element={<SuperHeroesPage />} />
        <Route exact path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
        <Route exact path="/rq-super-heroes/:heroId" element={< HeroDetails />} />
        HeroDetails
      </Routes>
      </div>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  );
}

export default App;
