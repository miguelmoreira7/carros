import { Car } from "../types";
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { generateImageUrl } from "../utils";
import Button from "@mui/material/Button";
import { useStateContext } from "../contexts/ContextProvider.tsx";
import { useNavigate } from "react-router-dom";


interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void
    car: Car
}

const CarDetails = ({isOpen, closeModal, car} : CarDetailsProps) => {
    
    const { currentColor, setCartData } = useStateContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = (car: Car) => {
        setCartData((prevCart) => [...prevCart, car]);
        closeModal();
    };

     useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleRedirectToLogin = () => {
        navigate("/loginOrRegister");
    };

  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25">

                </div>
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="car-details__dialog-panel">
                            <button type="button" onClick={closeModal} className="car-details__close-btn">
                                <img src="close.svg" alt="close" className="w-5 h-5 object-contain" />
                            </button>
                            <div className="flex-1 flex flex-col gap-3">
                                <div className="car-details__main-image">
                                    <img src={generateImageUrl(car)} alt="car model" className="w-full relative h-40 object-contain"/>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                        <img src={generateImageUrl(car, '29')} alt="car model" className="w-full h-24 object-contain"/>
                                    </div>
                                    <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                        <img src={generateImageUrl(car, '33')} alt="car model" className="w-full h-24 object-contain"/>
                                    </div>
                                    <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                        <img src={generateImageUrl(car, '13')} alt="car model" className="w-full h-24 object-contain"/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <h2 className="font-semibold text-xl capitalize">
                                    {car.make} {car.model}
                                </h2>
                                <div className="mt-3 flex flex-wrap gap-4">
                                    {Object.entries(car)
                                        .filter(([key]) => !["available", "id", "createdAt", "updatedAt", "userId", "data_inicio", "data_fim", "preco_diario"].includes(key))
                                        .map(([key, value]) => (
                                            <div className="flex justify-between gap-5 w-full text-right" key={key}>
                                                <h4 className="text-grey capitalize">{key.split("_").join(" ")}</h4>
                                                <p className="text-black-100 font-semibold capitalize">{value}</p>
                                            </div>
                                        ))}
                                    <div className="mt-4">
                                        {isLoggedIn ? (
                                            <Button
                                                onClick={() => handleAddToCart(car)}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: currentColor,
                                                    width: "460px",
                                                    borderRadius: "999px",
                                                    paddingY: "12px",
                                                    fontSize: "1rem",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Adicionar ao Carrinho
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleRedirectToLogin}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#f44336",
                                                    width: "460px",
                                                    borderRadius: "999px",
                                                    paddingY: "12px",
                                                    fontSize: "1rem",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Faça o Login para Alugar
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
    </>
  )
}

export default CarDetails