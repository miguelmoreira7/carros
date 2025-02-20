import { useEffect, useState } from "react"
import { CustomFilter, Hero, SearchBar, CarCard } from "../components"
import { fetchCars } from "../utils"
import { Car } from "../types/index"
import { useSearchParams } from "react-router-dom"
import { fuels, yearsOfProduction } from "../constants"


const Home = () => {

  const [cars, setCars] = useState<Car[]>([]);
  const [searchParams] = useSearchParams();

  const isDataEmpty = cars.length === 0 || !cars

  useEffect(() => {
  const fetchData = async () => {
    const data = await fetchCars(searchParams);
    setCars(Array.isArray(data) ? data : []);
  };
  fetchData();
}, [searchParams]); 


  return (
    <div className="overflow-hidden">
        <Hero/>
        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Catálogo de carros</h1>
            <p>Explore carros que você pode gostar</p>
          </div>
          <div className="home__filters">
            <SearchBar />
            <div className="home__filter-container">  
            <CustomFilter title ="Fuel" options = {fuels}/>          
            <CustomFilter title ="Year" options = {yearsOfProduction}/>          
            </div>
          </div>
          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {cars?.map((car, index) => (<CarCard car={car} key={index}/>))}
              </div>
            </section>
          ):(
            <div className="home__error-container">
              <h2 className="tect-black text-xl font-bold">Oops, sem resultados</h2>
            </div>
          )}
        </div>
    </div>
  )
}

export default Home