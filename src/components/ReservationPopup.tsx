import { Car, ReservationPopupProps } from "../types";
import Button from '@mui/material/Button';
import { useStateContext } from "../contexts/ContextProvider";
import { handleConfirmReservation } from "../utils";

const ReservationPopup = ({ onClose }: ReservationPopupProps) => {

    const { currentColor, setCartData, cartData} = useStateContext();

    const handleFinalizeRental = async () => {
          for (const car of cartData) {
              await handleConfirmReservation(car.id, onClose);
          }
          setCartData([]);
      };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <h2 className="text-xl font-semibold mb-4">Confirmar Reserva</h2>
                <p>Você deseja reservar os itens do carrinho?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={onClose} variant="contained" color="inherit"
                    sx={{
                        borderRadius: "999px"
                    }}>Cancelar</Button>
                    <Button onClick={() => {
                        handleFinalizeRental()
                    }} variant="contained" 
                        sx={{
                            borderRadius: "999px",
                            backgroundColor: currentColor
                        }}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReservationPopup;
