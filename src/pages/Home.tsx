import { useEffect, useState } from "react";
import { CustomFilter, Hero, SearchBar } from "../components";
import { fetchCars } from "../utils";
import { Car } from "../types/index";
import { useSearchParams } from "react-router-dom";
import { fuels, yearsOfProduction } from "../constants";
import CarListGeneral from "../components/CarListGeneral";
import CarListReserved from "../components/CarListReserved";

const Home = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const [view, setView] = useState<"allCars" | "reservations" >("allCars");

  const isDataEmpty = cars.length === 0 || !cars;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(searchParams);
        params.set("page", pagination.page.toString().trim());
        setSearchParams(params);

        const data = await fetchCars(params);
        setCars(data.carDetails || []);

        setPagination({
          page: Number(data.pagination.page) || 1,
          totalPages: Number(data.pagination.totalPages) || 1,
          total: Number(data.pagination.total) || 0,
          limit: Number(data.pagination.limit) || 10,
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [pagination.page, searchParams, setSearchParams]);

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: Number(prev.page) + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: Number(prev.page) - 1 }));
    }
  };

  return (
    <div className="overflow-hidden">
      <Hero view={view} setView={setView} />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Catálogo de carros</h1>
          <p>Explore carros que você pode gostar</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="Fuel" options={fuels} />
            <CustomFilter title="Year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            {view === "allCars" && <CarListGeneral cars={cars} />}
            {view === "reservations" && <CarListReserved />}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={pagination.page === 1}
                className="px-4 py-2 bg-blue-200 text-white-700 rounded-lg hover:bg-blue-300 disabled:bg-gray-100 disabled:text-gray-400 transition"
              >
                Anterior
              </button>
              <span className="text-gray-700 font-medium">
                Página {pagination.page} de {pagination.totalPages} ({pagination.total} carros)
              </span>
              <button
                onClick={handleNextPage}
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 bg-blue-200 text-white-700 rounded-lg hover:bg-blue-300 disabled:bg-gray-100 disabled:text-gray-400 transition"
              >
                Próxima
              </button>
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, sem resultados</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
