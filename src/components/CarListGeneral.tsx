import { Car } from "../types";
import CarCard from "./CarCard";

interface CarListGeneralProps {
  cars: Car[];
}

const CarListGeneral = ({ cars }: CarListGeneralProps) => {
  return (
    <div className="home__cars-wrapper">
      {cars.map((car, index) => (
        <CarCard car={car} key={index} />
      ))}
    </div>
  );
};

export default CarListGeneral;
