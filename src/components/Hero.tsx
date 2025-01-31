import { CustomButton } from "."


const Hero = () => {

  const handleScroll = () => {

  }

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
        handleClick={() => {handleScroll}}
        />
      </div>
      <div className="hero__image-container">
          <img src="/hero.png" alt="hero" className="object-contain hero__image"/>  
          <div className="hero__image-overlay"/>
      </div>
    </div>
  )
}

export default Hero