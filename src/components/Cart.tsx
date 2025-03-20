import Button from "./Button";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { Car } from "../types";
import { generateImageUrl } from "../utils";
import CustomButton from "./CustomButton";
import ReservationPopup from "./ReservationPopup";
import { useState } from "react";

const Cart = () => {
    const { cartData, currentColor } = useStateContext();
    const [showPopup, setShowPopup] = useState(false);

    // Função para calcular o total do aluguel
    const totalPrice = cartData.reduce((total, item) => total + item.preco_diario * 10, 0);

    const getImage = (car: Car) => generateImageUrl(car);

    const handleReserve = (carId: string) => {
        console.log(`Reservando carro com ID: ${carId}`);
        setShowPopup(false);
    };

    return (
        <div className="bg-half-transparent w-full fixed nav-item top-0 right-0">
            <div className="float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">Carrinho</p>
                    <Button
                        icon={<MdOutlineCancel />}
                        color="rgb(153, 171, 180)"
                        bgHoverColor="light-gray"
                        size="2xl"
                        borderRadius="50%"
                        bgColor={undefined}
                        text={undefined}
                        width={undefined}
                    />
                </div>

                {cartData?.map((item, index) => (
                    <div key={index} className="border-b-1 border-color dark:border-gray-600 p-4 flex items-center gap-5">
                        <img className="rounded-lg h-24 w-24" src={getImage(item)} alt={item.model} />
                        <div>
                            <p className="font-semibold">{item.model.toUpperCase()}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{item.make.toUpperCase()}</p>
                            <p className="font-semibold text-lg">Diária: R$ {(item.preco_diario * 10).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <div className="mt-3 mb-3">
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-500 dark:text-gray-200">Total</p>
                        <p className="font-semibold">R$ {totalPrice.toFixed(2)}</p>
                    </div>
                </div>

                <div className="mt-5">
                    <CustomButton
                        handleClick={() => setShowPopup(true)}
                        color="white"
                        bgColor={currentColor}
                        title="Finalizar aluguel"
                        borderRadius="10px"
                        width="full"
                    />
                </div>
            </div>

            {showPopup && <ReservationPopup onClose={() => setShowPopup(false)} onConfirm={handleReserve} />}
        </div>
    );
};

export default Cart;
