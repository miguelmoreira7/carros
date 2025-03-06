import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "./Button";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { Car } from "../types";
import { generateImageUrl, handleConfirmReservation } from "../utils";
import CustomButton from "./CustomButton";
import ReservationPopup from "./ReservationPopup";
import { useState } from "react";

const Cart = () => {

    const { setCartData, cartData, currentColor } = useStateContext();

    const getImage = (car: Car) => {
        return generateImageUrl(car)
    }

  
  const [showPopup, setShowPopup] = useState(false);
    const handleReserve = (carId: string) => {
        console.log(`Reservando carro com ID: ${carId}`);
        setShowPopup(false);
    };
  

    return (
        <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
          <div className="float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">Carrinho</p>
              <Button
                icon={<MdOutlineCancel />}
                color="rgb(153, 171, 180)"
                bgHoverColor="light-gray"
                size="2xl"
                borderRadius="50%"
              />
            </div>
            {cartData?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="flex items-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                    <img className="rounded-lg h-24 w-24" src={getImage(item)} alt="" />
                    <div>
                      <p className="font-semibold ">{item.model.toUpperCase()}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{item.make.toUpperCase()}</p>
                      <div className="flex gap-4 mt-2 items-center">
                        <p className="font-semibold text-lg">{item.available}</p>
                        <div className="flex items-center border-1 border-r-0 border-color rounded">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-3 mb-3">
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-500 dark:text-gray-200">Total</p>
                <p className="font-semibold">$0</p>
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
              {showPopup && (
                <ReservationPopup onClose={() => setShowPopup(false)} onConfirm={handleReserve} />
              )}
        </div>
      );
}

export default Cart