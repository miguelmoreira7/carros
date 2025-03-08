import { useEffect, useState } from "react";
import { CustomButton } from "."

interface HeroProps {
  view: "allCars" | "reservations" ;
  setView: (view: "allCars" | "reservations" ) => void;
}


const Hero = ({ setView }: HeroProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Usuário logado
    } else {
      setIsLoggedIn(false); // Usuário não logado
    }
  }, []);

  //const handleShowAll = () => {
    //setShowAllCars(true);
  //};

  const handleScrollToDiscover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const element = document.getElementById("discover");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

        {!isLoggedIn &&(
          <CustomButton
            title="Explorar carros"
            containerStyles="bg-primary-blue text-white rounded-full mt-10"
            handleClick={handleScrollToDiscover}
          />
        )}

        {isLoggedIn &&(
          <CustomButton
            title="Explorar carros"
            containerStyles="bg-primary-blue text-white rounded-full mt-10"
            handleClick={() => setView("allCars")}
          />
        )}

        {isLoggedIn && (
          <CustomButton
            title="Minhas Reservas"
            containerStyles="bg-primary-blue text-white rounded-full mt-4"
            handleClick={() => setView("reservations")}
          />
        )}
      </div>

      <div className="hero__image-container">
        <img src="/hero.png" alt="hero" className="object-contain hero__image" />
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
}

export default Hero