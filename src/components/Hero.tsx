import { useEffect, useState } from "react";
import { CustomButton } from "."
import CarListGeneral from "./CarListGeneral";
import CarListReserved from "./CarListReserved";



const Hero = () => {
  const [showReservations, setShowReservations] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Usuário logado
    } else {
      setIsLoggedIn(false); // Usuário não logado
    }
  }, []);

  const handleShowAll = () => {
    setShowAllCars(true);
  };

  const handleShowReservations = () => {
    setShowReservations(true);
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Encontre e compre um carro <br />De forma rápida e fácil!
        </h1>
        <p className="hero__subtitle">
          Melhorando sua experiência em compra de carros com nosso processo de busca
        </p>

        <CustomButton
          title="Explorar carros"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleShowAll}
        />

        {showAllCars && <CarListGeneral cars={[]} />}

        {isLoggedIn && (
          <CustomButton
            title="Minhas Reservas"
            containerStyles="bg-primary-blue text-white rounded-full mt-4"
            handleClick={handleShowReservations}
          />
        )}
      </div>

      <div className="hero__image-container">
        <img src="/hero.png" alt="hero" className="object-contain hero__image" />
        <div className="hero__image-overlay" />
      </div>

      {showReservations && <CarListReserved />}
    </div>
  );
}

export default Hero