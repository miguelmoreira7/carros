import { Car } from "../types";
import { useState } from "react";
import { CarDetails, CustomButton } from ".";
import { calculateCarRent, generateImageUrl } from "../utils";

interface CarCardProps {
    car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive, available } = car;
    const carRent = calculateCarRent(city_mpg, year);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`car-card group`}
            onClick={() => available && setIsOpen(true)}
        >
            <div className="car-card__content">
                <h2 className="car-card__content-title">
                    {make} {model}
                </h2>
            </div>
            <p className="car-card__price">
                <span className="car-card__price-dollar">R$</span>
                {carRent}
                <span className="car-card__price-day">/dia</span>
            </p>
            <img src={generateImageUrl(car)} alt="car model" className="car-card__image" />
            <div className="relative flex w-full mt-2">
                <div className="car-card__icon-container">
                    <div className="car-card__icon">
                        <img src="/steering-wheel.svg" alt="steering wheel" className="w-5 h-5" />
                        <p className="car-card__icon-text">
                            {transmission === "a" ? "Automático" : "Manual"}
                        </p>
                    </div>
                    <div className="car-card__icon">
                        <img src="/tire.svg" alt="tire" className="w-5 h-5" />
                        <p className="car-card__icon-text">{drive.toUpperCase()}</p>
                    </div>
                    <div className="car-card__icon">
                        <img src="/gas.svg" alt="gas" className="w-5 h-5" />
                        <p className="car-card__icon-text">{(city_mpg * 0.43).toFixed(2)} Km/L</p>
                    </div>
                </div>
                <div className="car-card__btn-container">
                    <CustomButton
                        title="Ver mais"
                        containerStyles={`w-full py-[16px] rounded-full ${
                            available ? "bg-primary-blue" : "bg-gray-400 cursor-not-allowed"
                        }`}
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => available && setIsOpen(true)}
                        disabled={!available}
                    />
                </div>
            </div>
            <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
        </div>
    );
};

export default CarCard;
