import { Car } from "../types";
import CarCard from "./CarCard";

interface CarListAvailableProps {
  cars: Car[];
}

const CarListAvailable = ({ cars }: CarListAvailableProps) => {
  const availableCars = cars.filter((car) => car.available);

  return (
    <div className="car-list">
      {availableCars.length > 0 ? (
        availableCars.map((car) => <CarCard key={car.id} car={car} />)
      ) : (
        <p className="text-center">Nenhum carro disponível no momento.</p>
      )}
    </div>
  );
};

export default CarListAvailable;
