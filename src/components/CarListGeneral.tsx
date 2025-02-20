import { Car } from "../types";
import CarCard from "./CarCard";

interface CarListGeneralProps {
  cars: Car[];
}

const CarListGeneral = ({ cars }: CarListGeneralProps) => {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarListGeneral;
