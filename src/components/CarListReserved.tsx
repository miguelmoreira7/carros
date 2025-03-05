import { Car } from "../types";
import CarCard from "./CarCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { port } from "../utils/apikey";

const CarListReserved = () => {
  const [reservedCars, setReservedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReservedCars = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `http://${port}/api1/car-details/my-reservations`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setReservedCars(response.data.reservations);
      } catch (error) {
        console.error("Erro ao carregar os carros reservados", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservedCars();
  }, []);

  if (loading) return <p>Carregando carros reservados...</p>;
  console.log(reservedCars); 
  return (
    <div className="car-list">
      {reservedCars.length > 0 ? (
        reservedCars.map((car) => <CarCard key={car.id} car={car} />)
      ) : (
        <p className="text-center">Você ainda não tem carros reservados.</p>
      )}
    </div>
  );
};

export default CarListReserved;
